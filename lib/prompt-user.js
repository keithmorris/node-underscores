/**
 * Created by Keith Morris on 11/10/14.
 */
/* jshint node:true */
"use strict";

var prompt = require('prompt'),
	slug   = require('slugg');

module.exports = function (argvOverride, callback) {
	var options = {
		underscoresme_generate       : 1,
		underscoresme_name           : "",
		underscoresme_slug           : "",
		underscoresme_author         : "",
		underscoresme_author_uri     : "",
		underscoresme_description    : "",
		underscoresme_sass           : 1,
		underscoresme_generate_submit: "Generate"
	};

	prompt.override = argvOverride;
	prompt.message = "[?]".green;

	// get name first
	prompt.get([{
		name       : 'name',
		description: "What is the name of your theme?",
		required   : true
	}], function (err, results) {
		options.underscoresme_name = results.name;
		// now get the rest
		prompt.get([
			{
				name       : 'description',
				description: "What is your theme's description?"
			},
			{
				name       : 'slug',
				description: "What is your theme's slug (should be a valid Wordpress slug)?",
				'default'  : slug(results.name)
			},
			{
				name       : 'author',
				description: "Author"
			},
			{
				name       : 'author_uri',
				description: "What is the Author's URL?"
			},
			{
				name       : 'sass',
				description: "Do you want SASS support?",
				default    : 'Y',
				message    : "Please enter Y or N",
				pattern    : /[YyNn]/
			},
			{
				name       : 'keep',
				description: "Do you want to keep the zip file after it is extracted?",
				default    : 'N',
				message    : "Please enter Y or N",
				pattern    : /[YyNn]/
			}
		], function (err, results) {
			options.underscoresme_description = results.description;
			options.underscoresme_slug = results.slug;
			options.underscoresme_author = results.author;
			options.underscoresme_author_uri = results.author_uri;
			if (typeof results.sass !== "boolean" && results.sass.toLowerCase() === 'n') {
				delete options.underscoresme_sass;
			}
			callback({
				params : options,
				keepZip: typeof results.keep === "boolean" || results.keep.toLowerCase() === 'y'
			});
		});
	});
};
