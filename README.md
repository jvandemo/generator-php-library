# Generator-php-library

A generator for [Yeoman](http://yeoman.io) to generate boilerplate for a PHP library with support for [PHPUnit](http://phpunit.de).

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-php-library`
- Run: `yo php-library`

## What the generator does for you
The generator will automatically create the following boilerplate for you:

- creates correctly namespaced folder structure for your library:
    - `/src` folder structure for your PHP code
    - `/tests` folder structure for your PHPUnit unit tests
- installs and configures PHPUnit:
    - installs PHPUnit using composer
    - creates a `phpunit.xml` and `Bootstrap.php` file for PHPUnit
    - creates GruntJS configuration for running PHPUnit using GruntJS
    - creates a sample unit test file `SampleTest.php`
- creates configuration files:
    - `composer.json` with autoloader support for your library
    - `package.json` with the right dependencies to lint and unit test your code
    - `Gruntfile.js` with the configuration to lint and unit test your code
- generates an autoloader for your library using composer

## How to add code to your library

Add your library classes in the namespaced directories in the `/src` directory.

## How to add unit tests

Add your unit tests in the namespaced directories in the `/tests` directory.

## How to test your code

Run `grunt` to lint your PHP code and run your unit tests:

    grunt

## Change log

### 1.0.0

- First public release

### 1.1.0

- Added GruntJS support for linting PHP using the [grunt-phplint](https://github.com/jgable/grunt-phplint) plugin
- Added GruntJS support for unit testing using the [grunt-phpunit](https://github.com/SaschaGalley/grunt-phpunit) plugin
- Added GruntJS support for PHP Code Sniffer using the [grunt-phpcs](https://github.com/SaschaGalley/grunt-phpcs) plugin
- Added basic `.gitignore`

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
