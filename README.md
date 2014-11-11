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

#### Full example:

This example demonstrates defining all of the parameters at the command line.
    
    underscores -n "My Great Theme" -d "Great theme like you've never seen before" -g "my-great-theme" -a "Keith Morris <email@example.com>" -u "http:www.example.com" -s -k

#### From the --help command

	Run underscores without command line arguments and you will be prompted for all options. Otherwise, run underscores with arguments to specify one or more options at the command prompt.

	Examples:
	  underscores                        you will be prompted for everything
	  underscores -n "My Great Theme"    You will be prompted for everything but the name of the theme.


	Options:
	  --name, -n         The name of your theme.                                                 
	  --description, -d  The theme's description.                                                
	  --slug, -g         The theme's Wordpress slug (this also defines resultant directory name).
	  --author, -a       Your theme's author.                                                    
	  --url, -u          Your theme's author's url                                               
	  --sass, -s         Download the "Sassified" version of the theme.                          
	  --keep, -k         Keep the downloaded zip file after extraction                           
	  --help, -h         Show this help message
	  
## Additional Uses

If used in conjunction with the [getwordpress](https://www.npmjs.org/package/getwordpress) module, you can very easliy download wordpress and install an underscores theme:

	getwordpress && cd wp-content/themes && underscores -n "Great Theme"
	
