#!/usr/bin/env node
/**
 * Created by Keith Morris on 11/10/14.
 */
"use strict";
var fs         = require('fs'),
	hyperquest = require('hyperquest'),
	minimist   = require('minimist'),
	promptUser = require('./lib/prompt-user'),
	qs         = require('querystring'),
	unzip      = require('adm-zip');

var url = "http://underscores.me/";

// read command line args
var argv = minimist(process.argv.slice(2), {
	alias: {
		'name'       : ['n'],
		'description': ['d'],
		'slug'       : ['s'],
		'author'     : ['a'],
		'authorUri'  : ['u'],
		'help'       : ['h']
	}
});

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



