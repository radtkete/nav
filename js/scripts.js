



(function($){
    "use strict"; // Start of use strict
    
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    
    $(window).load(function(){
        
        
        
        init_scroll_navigate();
        
        $(window).trigger("scroll");
        $(window).trigger("resize");
        
        // Hash menu forwarding
        if ((window.location.hash) && ($(window.location.hash).length)){
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }
        
    });
    
    $(document).ready(function(){
        
        $(window).trigger("resize");            
        init_classic_menu();



        init_js_mobile_menu();
        init_nav_link_more();
        init_sliders();
        init_expander();
        init_accordion();
        // init_sub_nav_boxes();
        init_sub_nav_boxes_advocacy();
    });
    
    $(window).resize(function(){
        
        init_classic_menu_resize();


        init_js_navigation_more();
        
    });
    
    
    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }
    
    
    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */
    
    // Sections backgrounds
    
    var pageSection = $(".home-section, .page-section, .small-section, .split-section, .cardinal-image");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Function for block height 100%
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    // Function equal height
    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);
    
    
    

    /* ---------------------------------------------
     Nav panel classic
     --------------------------------------------- */
    
    var hamburger_nav = $(".hamburger");
    var desktop_nav = $(".desktop-nav");
    
    function init_classic_menu_resize(){
        
        // Mobile menu max height
        $(".mobile-on .desktop-nav > ul, .mobile-on .nav-tools > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        
        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
        }
        else 
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }
    
    function init_classic_menu(){
    
        
        // Navbar sticky
        
        $(".js-stick").sticky({
            topSpacing: 0
        });
        
        
        height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
        height_line(hamburger_nav, $(".main-nav"));
        
        // hamburger_nav.css({
        //     "width": ($(".main-nav").height() - 24) / 2 + "px",
        //     "margin-top": ($(".main-nav").height() - 24) / 2 + "px"
        // });
        
        // Transpaner menu
        
        if ($(".main-nav").hasClass("transparent")){
           $(".main-nav").addClass("js-transparent"); 
        }
        
        $(window).scroll(function(){        
            
                if ($(window).scrollTop() > 10) {
                    $(".js-transparent").removeClass("transparent");
                    $(".main-nav, .nav-logo-wrap .logo, .hamburger").addClass("small-height");
                }
                else {
                    $(".js-transparent").addClass("transparent");
                    $(".main-nav, .nav-logo-wrap .logo, .hamburger").removeClass("small-height");
                }
            
            
        });
        
        // Mobile menu toggle
        
        hamburger_nav.click(function(){
        
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");

                
                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")){
                    $(window).scrollTo(".main-nav", "slow"); 
                }
                
            }
            
        });
        
        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (hamburger_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                hamburger_nav.removeClass("active");
            }
        });
        
        
        // Sub menu
        
        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;
        
        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");
        
        mnHasSub.click(function(){
        
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                
                return false;
            }
            else {
                
            }
            
        });
        
        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
            
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }
            
        }, function(){
        
            if (!($(".main-nav").hasClass("mobile-on"))) {
            
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
            
        });
        
    }
    
    
    
    /* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        $(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            offset: 0,
            easing: "easeInOutExpo"
        });
        
        var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a");
        

        
    }
    
    

    
    
    

    
    
    
    
    
})(jQuery); // End of use strict
























/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function init_js_mobile_menu(){
    (function($){

        var menuToggle = $("#js-mobile-menu").unbind();
        $("#js-navigation-menu").removeClass("show");

        menuToggle.on("click", function(e) {
            e.preventDefault();
            $("#js-navigation-menu").slideToggle(function(){
              if($("#js-navigation-menu").is(":hidden")) {
                $("#js-navigation-menu").removeAttr("style");
              }
            });
        });

    })(jQuery);
}






/* ---------------------------------------------
 init_js-navigation-more()
 --------------------------------------------- */

function init_js_navigation_more(){
    (function($){    
    
    var more = document.getElementById("js-navigation-more");

    if ($(more).length > 0) {
        var windowWidth = $(window).width();
    }
        
    })(jQuery);
}
       





/* ---------------------------------------------
 .nav-link-more
 --------------------------------------------- */

function init_nav_link_more(){
    (function($){

      $( ".nav-link-more" ).click(function() {
        $(this).toggleClass('active');
        $( ".mega-menu" ).slideToggle( "slow", function() {
          // Animation complete.
        });
      }); 

    })(jQuery);
}
        






/* ---------------------------------------------
 SLIDEWRS
 --------------------------------------------- */

function init_sliders(){
    (function($){



$(".fullwidth-slider").owlCarousel({
    slideSpeed: 350,
    singleItem: true,
    autoHeight: true,
    navigation: true,
    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
});



    })(jQuery);
}
        


/* ---------------------------------------------
 Expander
 --------------------------------------------- */

function init_expander(){

    (function($){
        $('.expander-trigger').click(function(){
        $(this).toggleClass("expander-hidden");
    });


    })(jQuery);
}




/* ---------------------------------------------
 Aaccordion
 --------------------------------------------- */


function init_accordion(){
    (function($){

        $('.js-accordion-trigger').bind('click', function(e){

        $btn  = $(this);
        $icon = $btn.find("i");
        $btn.parent().find('.accordion-body').slideToggle('fast');  // apply the toggle to the ul
        $btn.parent().toggleClass('is-expanded');

        if ($icon.hasClass("fa-plus")) {
            $icon.removeClass("fa-plus");
            $icon.addClass("fa-minus");
        }
        else if ($icon.hasClass("fa-minus")) {
            $icon.removeClass("fa-minus");
            $icon.addClass("fa-plus");
        }


        });

    })(jQuery);
}




/* ---------------------------------------------
 Sub Nav Boxes
 --------------------------------------------- */


function init_sub_nav_boxes_advocacy(){
    (function($){

        $('.sub-nav-footer').show();
        $('.sub-nav-box.advocacy-policy-central').addClass("is-active");

        $('.sub-nav-box.advocacy-policy-central').bind('click', function(e){
          $('ul.advocacy-policy-central').slideToggle( "slow", function() {
            // Animation complete.
          });
          $(this).toggleClass('is-active');
          e.preventDefault();
        });


    })(jQuery);
}





$(document).ready(function() {
  $(".dropdown-button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".dropdown-menu");
    $button.toggleClass('active');
    $menu.toggleClass("show-menu");
    $menu.children("li").click(function() {
      $menu.removeClass("show-menu");
      $button.html($(this).html());
    });
 
    // if ($menu.hasClass("show-menu")) {
    //     $menu.removeClass("show-menu");
    //     $button.removeClass("active");
    // }
    // else {
    //     $menu.addClass("show-menu");
    //     $button.addClass("active");
    // }
  });
});


// $(function(){
//     $('#top-nav span').click(function(){
//         divTrigger = $('#top-nav span').index(this);
//         thisMegaMenu = $('.megamenu:eq('+divTrigger+')');
//         $('.megamenu').slideUp(200);
//         if(thisMegaMenu.is(":not(':visible')")){
//         thisMegaMenu.slideDown(200);
//         }
// });

//     $('.closeButton').on('click',function(){
//         thisMegaMenu.slideUp(200);
//         event.preventDefault();
//     });
// });


// $(function(){
//     $('.navbar-link.navbar-link-mm > a').click(function(){
//         divTrigger = $('.navbar-link.navbar-link-mm > a').index(this);
//         thisMegaMenu = $('.megamenu:eq('+divTrigger+')');
//         $('.megamenu').slideUp(200);
//         if(thisMegaMenu.is(":not(':visible')")){
//         thisMegaMenu.slideDown(200);
//         }
// });

//     $('.closeButton').on('click',function(){
//         thisMegaMenu.slideUp(200);
//         event.preventDefault();
//     });
// });



$(function(){
    $('.nav-link.navbar-link-mm > a').click(function(){
        divTrigger = $('.nav-link.navbar-link-mm > a').index(this);
        thisMegaMenu = $('.megamenu:eq('+divTrigger+')');
        $('.megamenu').slideUp(200);
        if(thisMegaMenu.is(":not(':visible')")){
        thisMegaMenu.slideDown(200);
        }
});

    $('.closeButton').on('click',function(){
        thisMegaMenu.slideUp(200);
        event.preventDefault();
    });
});



























$('.nav-accordion-trigger').bind('click', function(e){
  jQuery(this).parent().find('.submenu').slideToggle('fast'); 
 // apply the toggle to the ul
  jQuery(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});