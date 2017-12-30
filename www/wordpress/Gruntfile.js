module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          'dist/css/styles.min.css': 'dist/tmp/tidy.css'
        }
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.faasl.org',
          port: 21,
          authPath: '../.ftppass',
          authKey: 'beta'
        },
        src: 'dist',
        dest: '/',
        exclusions: ['Gruntfile.js', './**/.DS_Store', './**/Thumbs.db', './dist/tmp'],
        forceVerbose: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files:[
          {
            expand: true,
            cwd: 'dist/tmp',
            src: ['*.processed.html'],
            dest: 'dist',
            ext: '.html',
            extDot: 'first'
          },
        ],
      }
    },
    processhtml: {
      dist: {
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            src: ['*.html', '!example.html', '!inspiration-1.html'], // Actual pattern(s) to match.
            dest: 'dist/tmp',   // Destination path prefix.
            ext: '.processed.html',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ],
      },
    },
    sass: {
      options: {
        sourceComments: true,
        sourceMap: false
      },
      dist: {
        files: {
          'dist/tmp/faasl.css': 'css/faasl.sass'
        }
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: ['.come-in', '.fa-spinner', '.fa-pulse']
        },
        files: [{
          nonull: true,
          src: ['index.html'],
          dest: 'dist/tmp/faasl.tidy.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  
  grunt.registerTask('beta', ['ftp-deploy']);
  grunt.registerTask('css', ['sass', 'uncss', 'cssmin']);
  grunt.registerTask('html', ['processhtml', 'htmlmin']);
};
