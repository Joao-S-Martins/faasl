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
        src: '.',
        dest: '/',
        exclusions: ['Gruntfile.js', './**/.DS_Store', './**/Thumbs.db', './dist/tmp'],
        forceVerbose: true
      }
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
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  
  grunt.registerTask('beta', ['ftp-deploy']);
  grunt.registerTask('css', ['sass', 'uncss', 'cssmin']);
};
