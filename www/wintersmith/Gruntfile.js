module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'build',
        dotfiles: false,
        add: false,
        branch: 'gh-pages',
        message: 'Website updates.',
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
    'csslint': {
      'strict': {
        options: {
          import: 2
        },
        src: ['build/styles/tidy.css']
      },
      'lax': {
        options: {
          import: false
        },
        src: ['build/styles/tidy.css']
      }
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
    'cssmin': {
      'combine': {
        files: {
          'build/styles/main.min.css': ['build/styles/embeded.css']
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
    'htmlmin': {
      'dist': {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: true
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*.{html,htm}'],
          dest: 'build'
        }]
      }
    },
    'imagemin': {
      options: {
        optimizationLevel: 7,
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
    },
    'lint5': {
      dirPath: "build",
      defaults: {
        templates: [
          "index.html"
        ]
      }
    },
    'closureCompiler': {
      options: {
        // [REQUIRED] Path to closure compiler
        compilerFile: 'vendor/google/closure/compiler.v20140407.jar',

        // [OPTIONAL] set to true if you want to check if files were modified
        // before starting compilation (can save some time in large sourcebases)
        checkModified: false,

        // [OPTIONAL] Set Closure Compiler Directives here
        compilerOpts: {
          /**
           * Keys will be used as directives for the compiler
           * values can be strings or arrays.
           * If no value is required use null
           *
           * The directive 'externs' is treated as a special case
           * allowing a grunt file syntax (<config:...>, *)
           *
           * Following are some directive samples...
           */
           compilation_level: 'SIMPLE_OPTIMIZATIONS', //ADVANCED_OPTIMIZATIONS
           externs: 'vendor/google/closure/externs/*.js',
           define: ["'goog.DEBUG=false'"],
           warning_level: 'verbose',
           jscomp_off: ['checkTypes', 'fileoverviewTags'],
           summary_detail_level: 3,
           output_wrapper: '"(function(){%output%}).call(this);"'
        },
        // [OPTIONAL] Set exec method options
        execOpts: {
           /**
            * Set maxBuffer if you got message "Error: maxBuffer exceeded."
            * Node default: 200*1024
            */
           maxBuffer: 200 * 1024
        }
      },
      'simple': {
        // [OPTIONAL] Target files to compile. Can be a string, an array of strings
        // or grunt file syntax (<config:...>, *)
        src: 'build/js/bundled.js',

        // [OPTIONAL] set an output file
        dest: 'build/js/compiled.js'
      },
      'advanced': {
        options: {
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }
        },
        // [OPTIONAL] Target files to compile. Can be a string, an array of strings
        // or grunt file syntax (<config:...>, *)
        src: 'build/js/bundled.js',

        // [OPTIONAL] set an output file
        dest: 'build/js/compiled.js'
      }
    },
    'uglify': {
      'dist': {
        files: {
          'build/js/bundled.min.js': ['build/js/bundled.js']
        }
      }
    },
    'clean': {
      'build': ["build/"],
      'dist': ["dist/"]
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-lesslint')
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-lint5');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['build']);

  grunt.registerTask('js', ['closureCompiler:simple']);
  grunt.registerTask('css', ['uncss','cssUrlEmbed','cssmin']);
  grunt.registerTask('html', ['processhtml','htmlmin']);
  grunt.registerTask('img', ['imagemin:backgrounds','imagemin:homeitems']);
  grunt.registerTask('deploy', ['build','gh-pages']);
  grunt.registerTask('build', ['clean','wintersmith:build','js','img','css','html']);
  grunt.registerTask('dev', ['clean','wintersmith:build','js','img','css','html']);

  //grunt.registerTask('csslint', ['lesslint']);
  //grunt.registerTask('test', []);

};
