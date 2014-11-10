#underscores

underscores is a command line utility for generating and downloading your Underscores (_s) based Wordpress starter theme.

## What it does
This tool acts as a shortcut for the form found on [http://underscores.me](http://underscores.me) that customizes and downloads a starter Underscores theme. This tool calls the same endpoint as the form on the website so the results should be the same.

The utility asks for user input and then downloads and unzips the customizes Underscores theme. Optionally, you may choose to save the downloaded zip file.

##Installation
Installation is super simple through NPM. Here we install globally so you can use it anywhere:

    npm install -g underscores

## Usage
Typically you would run the command from within your `wp-content/themes/` directory of your Wordpress installation. 

### Basic Usage
Simply running the `underscores` command by itself will walk you through a series of questions and then download the theme.

### Advanced Usage
You may also supply all of the options that are collected in the basic method through command line parameters.