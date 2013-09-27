'use strict';
var util = require('util')
    , path = require('path')
    , yeoman = require('yeoman-generator')
    , childProcess = require('child_process');


var PhpLibraryGenerator = module.exports = function PhpLibraryGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {

        console.log('');
        console.log('------------------------------------------------------------------');
        console.log('Installing dependencies using composer...');
        console.log('------------------------------------------------------------------');
        console.log('');

        var exec = childProcess.exec
            , child1
            , child2;

        // Make sure shell script is executable
        child1 = exec('chmod +x tests/run_tests.sh');

        // Download dependencies with composer and create autoloader
        child2 = exec('php composer.phar install',
            function (error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {

                    console.log('');
                    console.log('------------------------------------------------------------------');
                    console.log('Oops, something went wrong when trying to run composer');
                    console.log('------------------------------------------------------------------');
                    console.log('');
                    console.log('Make sure you have installed composer and that composer.phar is in your path.');
                    console.log('Or try again and choose Yes when asked if you want to download composer.');
                    console.log('');
                    console.log('');

                    return;
                    // throw error;
                }

                console.log('');
                console.log('------------------------------------------------------------------');
                console.log('Your library has been generated successfully!');
                console.log('------------------------------------------------------------------');
                console.log('');
                console.log('So what\'s next?');
                console.log('');
                console.log('   1. Add library code to the /src folder');
                console.log('');
                console.log('   2. Add unit tests to the /tests folder');
                console.log('');
                console.log('   3. To lint your code and run the unit tests, simply run: grunt');
                console.log('');
                console.log('Have fun!');

            });

    });

    this.on('end', function () {
        console.log('');
        console.log('------------------------------------------------------------------');
        console.log('Installing dependencies using npm...');
        console.log('------------------------------------------------------------------');
        console.log('');
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../composer.json')));
};

util.inherits(PhpLibraryGenerator, yeoman.generators.Base);

PhpLibraryGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'libraryName',
            message: 'What do you want to call your library?',
            default: 'yourname/library-name'
        },
        {
            name: 'libraryNamespace',
            message: 'What is the PHP namespace of your library?',
            default: 'Library\\Namespace'
        },
        {
            type: 'confirm',
            name: 'downloadComposer',
            message: 'Would you like to download composer.phar into your project directory?',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {
        this.libraryName = props.libraryName;
        this.libraryNamespace = props.libraryNamespace;
        this.libraryNamespaceWithDoubleBackslashes = props.libraryNamespace.replace('\\', '\\\\');
        this.downloadComposer = props.downloadComposer;

        this.libraryNamespaceParts = this.libraryNamespace.split('\\');

        cb();
    }.bind(this));
};

PhpLibraryGenerator.prototype.doDownloadComposer = function doDownloadComposer() {

    if(!this.downloadComposer){
        return;
    }

    console.log('');
    console.log('------------------------------------------------------------------');
    console.log('Downloading composer...');
    console.log('------------------------------------------------------------------');
    console.log('');

    var done = this.async();

    this.fetch('https://getcomposer.org/composer.phar', 'composer.phar', function (err) {
        if (err) {
            return done(err);
        }
        done();
    });
};

PhpLibraryGenerator.prototype.doConfigureGruntJS = function doConfigureGruntJS() {

    console.log('');
    console.log('------------------------------------------------------------------');
    console.log('Generating GruntJS configuration...');
    console.log('------------------------------------------------------------------');
    console.log('');

    this.template('_package.json', 'package.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
};

PhpLibraryGenerator.prototype.setupPhpUnitDirectories = function setupPhpUnitDirectories() {

    console.log('');
    console.log('------------------------------------------------------------------');
    console.log('Creating directory structure for PHP Unit...');
    console.log('------------------------------------------------------------------');
    console.log('');

    var folder = 'tests';
    this.mkdir(folder);

    // Create subdirectory structure /tests/LibraryTest/Namespace
    for(var i= 0, l=this.libraryNamespaceParts.length; i < l; i++){
        folder = folder +'/' + this.libraryNamespaceParts[i];

        // Add Test suffix to folder name of first level directory name
        if(i === 0){
            folder = folder + 'Test';
        }
        this.mkdir(folder);
    }

    // Add sample file to final folder directory
    this.copy('tests/SampleTest.php', folder + '/SampleTest.php');

    this.template('tests/_phpunit.xml', 'tests/phpunit.xml');
    this.copy('tests/Bootstrap.php', 'tests/Bootstrap.php');
    this.copy('tests/run_tests.sh', 'tests/run_tests.sh');
};

PhpLibraryGenerator.prototype.setupLibraryDirectories = function setupLibraryDirectories() {

    console.log('');
    console.log('------------------------------------------------------------------');
    console.log('Creating directory structure for library...');
    console.log('------------------------------------------------------------------');
    console.log('');

    var folder = 'src';
    this.mkdir(folder);

    // Create subdirectory structure /src/Library/Namespace
    for(var i= 0, l=this.libraryNamespaceParts.length; i < l; i++){
        folder = folder +'/' + this.libraryNamespaceParts[i];
        this.mkdir(folder);
    }
    this.template('_composer.json', 'composer.json');
};

PhpLibraryGenerator.prototype.doCopyBasicFiles = function doCopyBasicFiles() {
    this.copy('gitignore', '.gitignore');
};

