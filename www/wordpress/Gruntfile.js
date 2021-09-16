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
    clean: ['dist'],
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
      cgi: {
        files: [
          {
            expand: true,
            cwd: 'cgi/',
            src: ['**'],
            dest: 'dist/cgi/'
          }
        ]
      },
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
      meta: {
        files: {
          'dist/humants.txt': 'humans.txt',
          'dist/robots.txt': 'robots.txt',
          'dist/sitemap.xml': 'sitemap.xml'
        }
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
          'dist/css/styles.min.css': 'dist/tmp/faasl.tidy.embedded.css'
        }
      }
    },
    cssUrlEmbed: {
      dist: {
        files: {
          "dist/tmp/faasl.tidy.embedded.css": "dist/tmp/faasl.tidy.css"
        },
        failOnMissingUrl: false,
        skipUrlsLargerThan: '300 KB'
      }
    },
    ftpush: {
      beta: {
        auth: {
          host: 'ftp.faasl.org',
          port: 21,
          authKey: 'beta'
        },
        src: 'dist/',
        dest: '/',
        exclusions: ['./**/.DS_Store', './**/Thumbs.db', 'tmp'],
//        keep: ['/important/images/at/server/*.jpg'],
        simple: true,
        useList: true
      },
      release: {
        auth: {
          host: 'ftp.faasl.org',
          port: 21,
          authKey: 'faasl'
        },
        src: 'dist/',
        dest: '/',
        exclusions: ['./**/.DS_Store', './**/Thumbs.db', 'tmp'],
//        keep: ['/important/images/at/server/*.jpg'],
        simple: true,
        useList: true
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
          message: 'Adding phantomas stats for upcoming release.'
        },
        files: {
          src: ['phantomas/*']
        }
      }
    },
    gitpush: {},
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
    imageEmbed: {
      dist: {
        src: [ "dist/tmp/faasl.tidy.css" ],
        dest: "dist/tmp/faasl.tidy.embedded.css",
        options: {
//          baseDir: '..',
          deleteAfterEncoding : false,
          maxImageSize: 32768,
          preEncodeCallback: function (filename) { return true; },
          regexInclude: /\.(jpg|png|gif|jpeg)/gi,
          regexExclude: /.(eot|woff|ttf|svg|typekit)/gi
        }
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
      beta: {
        files: [
          {
            expand: true,
            src: ['*.html', '!example.html', '!goog-anal.html', '!inspiration-1.html'],
            dest: 'dist/tmp',
            ext: '.processed.html',
            extDot: 'first'
          },
        ],
      },
      release: {
        files: [
          {
            expand: true,
            src: ['*.html', '!example.html', '!goog-anal.html', '!inspiration-1.html'],
            dest: 'dist/tmp',
            ext: '.processed.html',
            extDot: 'first'
          },
        ],
      }
    },
    sass: {
      options: {
        sourceComments: false,
        sourceMap: false
      },
      dist: {
        files: {
          'css/faasl.css': 'css/faasl.sass',
          'dist/css/ie9.css': 'css/ie9.sass'
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
            /.yellow-bg/,
            /.come-in/,
            /.slide-up/,
            /.slide-left/,
            /.slide-right/,
            /.fa-spinner/,
            /.fa-pulse/,
            /\w\.in/,
            /.fade/,
            /.collapse/,
            /.collapsed/,
            /.collapsing/,
            /(#|\.)navbar(-[a-zA-Z]+)?/,
            /(#|\.)dropdown(-[a-zA-Z]+)?/,
            /(#|\.)(open)/,
            // injected via JS
            /disabled/,
            /\.no-js/,
            /\.defer/,
            /.active/,
            /\.affix/,
//            /nav#main-navbar.affix/,
//            /nav#main-navbar.affix .navbar-collapse/,
            /.affix/,
            /.alert/,
            /.close/,
            /.collaps/,
            /.fade/,
            /.has/,
            /.help/,
            /.in/,
//            /.modal/,
            /.open/,
//            /.popover/,
//            /.tooltip/,
            /.item/,
            /.active/,
            /.next/,
            /.left/
          ]
        },
        files: [{
          nonull: true,
          src: ['index.html', 'students.html'],
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks("grunt-image-embed");
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  
  
  // Common
  grunt.registerTask('cgi', ['copy:cgi']);
  grunt.registerTask('css', ['newer:sass', 'newer:uncss', 'newer:imageEmbed', 'newer:cssmin']);
  grunt.registerTask('favicons', ['copy:favicons']);
  grunt.registerTask('fonts', ['copy:fonts']);
  grunt.registerTask('html', ['newer:processhtml', 'newer:htmlmin']);
  grunt.registerTask('img', ['newer:imagemin:jpgs', 'copy:svg']);
  grunt.registerTask('js', ['newer:uglify']);
  
  // Dev
  grunt.registerTask('finishFeature', ['bump:minor']);
  grunt.registerTask('perf', ['connect:phantomas']);
  grunt.registerTask('startFeature', ['bump:preminor']);
  grunt.registerTask('test', ['beta-build', 'connect:dist']);
  
  // Beta
  grunt.registerTask('beta', ['beta-build', 'bump-only', 'ftpush:beta', 'phantomas:beta', 'gitadd:phantomas', 'gitcommit:phantomas', 'bump-commit']);
  grunt.registerTask('beta-build', ['clean', 'cgi', 'img', 'fonts', 'css', 'js', 'beta-html', 'favicons']);
  grunt.registerTask('beta-html', ['processhtml:beta', 'newer:htmlmin']);
  grunt.registerTask('prerelease', ['beta-build', 'bump-only:prerelease', 'ftpush:beta', 'phantomas:beta', 'gitadd:phantomas', 'gitcommit:phantomas', 'bump-commit']);

  // Release
  grunt.registerTask('release', ['release-build', 'ftpush:release', 'phantomas:faasl', 'gitadd:phantomas', 'gitcommit:phantomas', 'gitpush']);
  grunt.registerTask('release-build', ['clean', 'cgi', 'img', 'fonts', 'css', 'js', 'release-html', 'favicons']);
  grunt.registerTask('release-html', ['processhtml:release', 'newer:htmlmin']);
};


// Useful things

//$ grunt bump
//>> Version bumped to 0.0.2
//>> Committed as "Release v0.0.2"
//>> Tagged as "v0.0.2"
//>> Pushed to origin
//
//$ grunt bump:patch
//>> Version bumped to 0.0.3
//>> Committed as "Release v0.0.3"
//>> Tagged as "v0.0.3"
//>> Pushed to origin
//
//$ grunt bump:minor
//>> Version bumped to 0.1.0
//>> Committed as "Release v0.1.0"
//>> Tagged as "v0.1.0"
//>> Pushed to origin
//
//$ grunt bump:major
//>> Version bumped to 1.0.0
//>> Committed as "Release v1.0.0"
//>> Tagged as "v1.0.0"
//>> Pushed to origin
//
//$ grunt bump:patch
//>> Version bumped to 1.0.1
//>> Committed as "Release v1.0.1"
//>> Tagged as "v1.0.1"
//>> Pushed to origin
//
//$ grunt bump:git
//>> Version bumped to 1.0.1-ge96c
//>> Committed as "Release v1.0.1-ge96c"
//>> Tagged as "v1.0.1-ge96c"
//>> Pushed to origin
//
//$ grunt bump:prepatch
//>> Version bumped to 1.0.2-0
//>> Committed as "Release v1.0.2-0"
//>> Tagged as "v1.0.2-0"
//>> Pushed to origin
//
//$ grunt bump:prerelease
//>> Version bumped to 1.0.2-1
//>> Committed as "Release v1.0.2-1"
//>> Tagged as "v1.0.2-1"
//>> Pushed to origin
//
//$ grunt bump:patch # (major, minor or patch) will do this
//>> Version bumped to 1.0.2
//>> Committed as "Release v1.0.2"
//>> Tagged as "v1.0.2"
//>> Pushed to origin
//
//$ grunt bump:preminor
//>> Version bumped to 1.1.0-0
//>> Committed as "Release v1.1.0-0"
//>> Tagged as "v1.1.0-0"
//>> Pushed to origin
//
//$ grunt bump
//>> Version bumped to 1.1.0
//>> Committed as "Release v1.1.0"
//>> Tagged as "v1.1.0"
//>> Pushed to origin
//
//$ grunt bump:premajor (with prereleaseName set to 'rc' in options)
//>> Version bumped to 2.0.0-rc.0
//>> Committed as "Release v2.0.0-rc.0"
//>> Tagged as "v2.0.0-rc.0"
//>> Pushed to origin
//
//$ grunt bump
//>> Version bumped to 2.0.0
//>> Committed as "Release v2.0.0"
//>> Tagged as "v2.0.0"
//>> Pushed to origin
//
//$ grunt bump:prerelease  # from a released version `prerelease` defaults to prepatch
//>> Version bumped to 2.0.1-rc.0
//>> Committed as "Release v2.0.1-rc.0"
//>> Tagged as "v2.0.1-rc.0"
//>> Pushed to origin
//
//$ grunt bump --setversion=2.0.1
//>> Version bumped to 2.0.1
//>> Committed as "Release v2.0.1"
//>> Tagged as "v2.0.1"
//>> Pushed to origin
