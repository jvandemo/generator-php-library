module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        composer: grunt.file.readJSON('composer.json'),
        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*.php'
            ],
            tasks: ['default']
        },
        phplint: {
            options: {
                swapPath: '/tmp'
            },
            library: [
                'src/**/*.php'
            ]
        },
        phpcs: {
            library: {
                dir: 'src'
            },
            options: {
                bin: 'vendor/bin/phpcs',
                standard: 'PSR2',
                extensions: 'php'
            }
        },
        phpunit: {
            classes: {
                dir: 'tests'
            },
            options: {
                bin: 'vendor/bin/phpunit',
                staticBackup: false,
                colors: true,
                noGlobalsBackup: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-phplint');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['phplint', 'phpcs', 'phpunit']);
    grunt.registerTask('livereload', ['default', 'watch']);

};