# Generator-php-library

A generator for Yeoman to generate boilerplate for a PHP library with support for PHPUnit.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-php-library`
- Run: `yo php-library`

## What the generator does for you
The generator will automatically create the following boilerplate for you:

- generate a correctly namespaced `/src` folder structure for your PHP code
- generate a correctly namespaced `/tests` folder structure for your PHPUnit unit tests
- create a `phpunit.xml` and `Bootstrap.php` file for PHPUnit
- configure `composer.json` with autoloader support for your library
- run composer to install dependencies and generate the autoloader

## Adding library code

Add your library classes in the namespaced directories in the `src` directory.

## Adding unit tests

Add your unit tests in the namespaced directories in the `tests` directory.

## Running unit tests

From the `/tests` folder:

    ./run_tests.sh

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
