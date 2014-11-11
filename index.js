#!/usr/bin/env node
/**
 * Created by Keith Morris on 11/10/14.
 */
"use strict";
var fs         = require('fs'),
	hyperquest = require('hyperquest'),
	promptUser = require('./lib/prompt-user'),
	qs         = require('querystring'),
	unzip      = require('adm-zip'),
	yargs      = require('yargs');

var url = "http://underscores.me/";

var argv = yargs
	.usage("Run underscores without command line arguments and you will be prompted for all options. " +
	"Otherwise, run underscores with arguments to specify one or more options at the command prompt.")
	.example('$0', "you will be prompted for everything")
	.example('$0 -n "My Great Theme"', 'You will be prompted for everything but the name of the theme.')
	.alias('name', 'n')
	.describe('name', 'The name of your theme.')
	.alias('description', 'd')
	.describe('description', 'The theme\'s description.')
	.alias('slug', 'g')
	.describe('slug', 'The theme\'s Wordpress slug (this also defines resultant directory name).')
	.alias('author', 'a')
	.describe('author', 'Your theme\'s author.')
	.alias('url', ['u', 'author_uri'])
	.describe('url', 'Your theme\'s author\'s url')
	.alias('sass', 's')
	.describe('sass', 'Download the "Sassified" version of the theme.')
	.alias('keep', 'k')
	.describe('keep', 'Keep the downloaded zip file after extraction')
	.alias('help', 'h')
	.describe('help', 'Show this help message')
	.argv;

if (argv.help) {
	console.log(yargs.help());
	process.exit();
}

promptUser(argv, function (options) {
	var data = qs.stringify(options.params),
		reqOpt = {
			headers: {
				'Content-Type'  : 'application/x-www-form-urlencoded',
				'Content-Length': data.length
			}
		},
		filename,
		filepath;

	console.log('Generating and downloading theme.');
	var req = hyperquest.post(url, reqOpt, function (err, res) {
		filename = qs.parse(res.headers['content-disposition'].split('; ')[1].replace(/"/g, '')).filename;
		filepath = './' + filename;
		var zipStream = fs.createWriteStream(filepath);
		res.pipe(zipStream);

		zipStream.on('finish', function () {
			console.log('Finish downloading theme ' + filename);
			var files = unzip(filepath);
			files.extractAllTo('./', true);
			console.log('Finished unzipping theme.');
			if (!options.keepZip) {
				fs.unlink(filepath);
			}
		});
	});
	req.end(data, 'utf8');
});



