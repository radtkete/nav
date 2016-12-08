module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),







    watch : {
	    options: {
	      livereload: true,
	    },
    	css: {
    		files: ['scss/**/*.scss'], // <-- when these files change
    		tasks: ['sass:dev']	// <-- run this task
    	},
      html: {
        files: '*.html'
      }
    },


    sass: {
    	dev: {
    		options: {
    			outputStyle: 'expanded',
          sourceMap: true
    		},
    		files: {
                'css/application.css'  :  'scss/application.scss'
    		}
    	},
    	build: {
    		options: {
    			outputStyle: 'compressed'
    		},
    		files: {
    			'css/application.css'  :  'scss/application.scss'
    		}
    	}
    } 

 

  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-watch'); // watch you do not need to resgister that task just enter on comand line 'grunt watch'
  grunt.loadNpmTasks('grunt-sass');

  // Register the default tasks.
  grunt.registerTask('default', ['sass:dev']);
  grunt.registerTask('build', ['sass:build']);
};