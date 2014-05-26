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
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('test', []);

  grunt.registerTask('default', ['gh-pages']);
};