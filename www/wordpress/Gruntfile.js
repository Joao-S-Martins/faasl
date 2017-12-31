module.exports = function(grunt) {
  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    },
    connect: {
      dist: {
        options: {
          keepalive: true,
          port: 4747,
          base: 'dist'
        }
      },
      phantomas: {
        options: {
          keepalive: true,
          port: 4747,
          base: 'phantomas'
        }
      }
    },
    copy: {
      favicons: {
        files: [
          {
            expand: true,
            cwd: 'favicons/',
            src: ['**'],
            dest: 'dist/'
          }
        ]
      },
      fonts: {
        files: [
          {
            src: ['fonts/**/*'],
            dest: 'dist/'
          }
        ]
      },
      svg: {
        files: [
          {
            src: ['img/**/*.svg'],
            dest: 'dist/'
          }
        ]
      }
    },
    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          'dist/css/styles.min.css': ['css/font-awesome.min.css', 'dist/tmp/faasl.css'] // 'dist/tmp/faasl.tidy.css'
        }
      }
    },
    'ftp-deploy': {
      beta: {
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
      },
      release: {
        auth: {
          host: 'ftp.faasl.org',
          port: 21,
          authPath: '../.ftppass',
          authKey: 'faasl'
        },
        src: 'dist',
        dest: '/',
        exclusions: ['Gruntfile.js', './**/.DS_Store', './**/Thumbs.db', './dist/tmp'],
        forceVerbose: true
      }
    },
    gitadd: {
      phantomas: {
        files: {
          src: ['phantomas/*']
        }
      }
    },
    gitcommit: {
      phantomas: {
        options: {
          message: 'Adding phantomas stats for latest release.'
        },
        files: {
          src: ['phantomas/*']
        }
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
    imagemin: {
      options: {
        interlaced: true,
        optimizationLevel: 3,
        progressive: true
      },
      jpgs: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.jpg'],
          dest: 'dist/img/'
        }]
      }
    },
    newer: {
      options: {
        tolerance: 1000
      }
    },
    phantomas: {
      beta : {
        options : {
          indexPath : './phantomas/beta/',
          options   : {
            'no-externals' : true
          },
          url       : 'http://beta.faasl.org/',
          buildUi   : true
        }
      },
      faasl : {
        options : {
          indexPath : './phantomas/faasl/',
          options   : {},
          url       : 'http://www.faasl.org/',
          buildUi   : true
        }
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
        sourceComments: false,
        sourceMap: false
      },
      dist: {
        files: {
          'dist/tmp/faasl.css': 'css/faasl.sass'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          'dist/js/app.min.js': [
            'js/jquery-1.11.3.min.js',
            'js/bootstrap.js',
            'node_modules/jquery-match-height/jquery.matchHeight.js',
            'js/faasl.js'
          ]
        }
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: [
            '.come-in',
            '.come-in.slide-up',
            '.come-in.slide-left',
            '.come-in.slide-right',
            '.fa-spinner',
            '.fa-pulse',
            /\w\.in/,
            '.fade',
            '.collapse',
            '.collapsed',
            '.collapsing',
            /(#|\.)navbar(-[a-zA-Z]+)?/,
            /(#|\.)dropdown(-[a-zA-Z]+)?/,
            /(#|\.)(open)/,
            // injected via JS
            /disabled/,
            /\.no-js/,
            /\.defer/,
            '.active',
            /^.*\.affix/,
            'nav#main-navbar.affix',
            'nav#main-navbar.affix .navbar-collapse',
            '.affix',
            '.alert',
            '.close',
            '.collaps',
            '.fade',
            '.has',
            '.help',
            '.in',
            '.modal',
            '.open',
            '.popover',
            '.tooltip',
            '.item',
            '.next',
            '.left',
            '.item.active',
            '.item.active.left',
            '.item.next',
            '.item.next.left'
          ]
        },
        files: [{
          nonull: true,
          src: ['index.html'],
          dest: 'dist/tmp/faasl.tidy.css'
        }]
      }
    },
    watch: {
      css: {
        files: 'css/**/*.sass',
        tasks: ['sass'],
        options: {
          livereload: {
            host: 'localhost',
            port: 4747,
          }
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  
  grunt.registerTask('beta', ['build', 'bump-only', 'ftp-deploy:beta', 'phantomas:beta', 'gitadd:phantomas', 'bump-commit']); //'gitcommit:phantomas']);
  grunt.registerTask('build', ['img', 'fonts', 'css', 'js', 'html', 'favicons']);
//  grunt.registerTask('css', ['newer:sass', 'newer:uncss', 'newer:cssmin']);
  grunt.registerTask('css', ['newer:sass', 'newer:cssmin']);
  grunt.registerTask('favicons', ['copy:favicons']);
  grunt.registerTask('fonts', ['copy:fonts']);
  grunt.registerTask('html', ['newer:processhtml', 'newer:htmlmin']);
  grunt.registerTask('img', ['newer:imagemin:jpgs', 'copy:svg']);
  grunt.registerTask('js', ['newer:uglify']);
  grunt.registerTask('perf', ['connect:phantomas']);
  grunt.registerTask('release', ['ftp-deploy:release', 'phantomas:faasl'])
  grunt.registerTask('test', ['build', 'connect:dist']);
};
