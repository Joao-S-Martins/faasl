module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'build',
        dotfiles: false,
        add: false,
        branch: 'gh-pages',
        message: 'Testing deploy',
        push: true
      },
      src: '**/*'
    },
    'wintersmith': {
      'build': {},
      'preview': {
        options: {
          action: "preview"
        }
      }
    },
    'lesslint': {
      src: ['contents/**/*.less']
    },
    'uncss': {
      'dist': {
        options: {
          ignore: ['.in', '.navbar-collapse.in', '.navbar-collapse.in', '.collapse.in', '.fade.in'],
          stylesheets  : ['styles/raw.css']
        },
        files: {
          'build/styles/tidy.css': ['build/index.html', 'build/events.html', 'build/contact.html']
        }
      }
    },
    'cssUrlEmbed': {
      encodeDirectly: {
        files: {
          'build/styles/embeded.css': ['build/styles/tidy.css']
        }
      }
    },
    'processhtml': {
      options: {
        includeBase: 'build/'
      },
      'dist': {
        options: {
          process: true,
        },
        files: [
          {
            expand: true,     
            cwd: 'build/',   
            src: ['**/*.html'],
            dest: 'build',  
            ext: '.html'
          },
        ],
      }
    },
    'imagemin': {
      options: {
        optimizationLevel: 3,
        progressive: true
      },
      'backgrounds': {
        files: [{
          expand: true,
          cwd: 'build/styles/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/styles/img'
        }]
      },
      'homeitems': {
        files: [{
          expand: true,
          cwd: 'build/homeitems',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/homeitems'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-lesslint')
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-wintersmith');

  grunt.registerTask('default', ['gh-pages']);

  grunt.registerTask('css', ['uncss', 'cssUrlEmbed']);
  grunt.registerTask('html', ['processhtml']);
  grunt.registerTask('img', ['imagemin:backgrounds','imagemin:homeitems']);
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('build', ['wintersmith:build','img', 'css', 'html']);

  grunt.registerTask('lint', ['lesslint']);
  grunt.registerTask('test', []);

};