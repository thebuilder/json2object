var fs = require('fs');
var path = require('path');
var varname = require('varname');
var extend = require('extend');
var glob = require('glob');

/**
 * Reads all the .json files in a directory, and returns an array containing files as objects.
 * @param dir {string} Path to root directory, to fetch json files from.
 * @param pattern {string=} Glob to use for finding .json files. Default: '**\/*.json'
 * @param opts {object=} Globbing options. By default 'cwd' will be set to root directory.
 * @returns {Array}
 */
exports.getArray = function(dir, pattern, opts) {
	//Ensure valid directory
	dir = validateDir(dir);
	//Retrieve all the files
	var files = globJsonFiles(dir, pattern, opts);

	var data = [];
	//Loop over all the files
	files.forEach(function(file) {
		//Read all the json files, and push them into the array
			data.push(readJson(dir + file));
	});

	return data;
};

/**
 * Reads all the .json files in a directory, and returns an array containing files as objects.
 * @param dir {string} Path to root directory, to fetch json files from.
 * @param pattern {string=} Glob to use for finding .json files. Default: '**\/*.json'
 * @param opts {object=} Globbing options. By default 'cwd' will be set to root directory.
 * @returns {Array}
 */
exports.getObjectArray = function(dir, pattern, opts) {
	opts = opts || {};
	//Ensure valid directory
	dir = validateDir(dir);
	//Retrieve all the files
	var files = globJsonFiles(dir, pattern, opts);

	var data = [];
	//Loop over all the files
	files.forEach(function(file) {
		//Read all the json files, and assign their values to a data object with their name as id.
		data.push({
			name: varname.camelback(path.basename(file, '.json')),
			path: path.dirname(file) + path.sep,
			data: readJson(dir + file)
		});
	});

	return data;
};

/**
 * Reads all the json files in a directory, including subdirectories, and merges the data into an object with path and filename converted into object names.
 * @param dir {string} String directory to look up. Does not support globbing.
 * @param pattern {string=} Glob to use for finding .json files. Default: '**\/*.json'
 * @param opts {object=} Globbing options. By default 'cwd' will be set to root directory.
 * @return {{}} Returns a new object.
 */
exports.getObject = function(dir, pattern, opts) {
	var data = {};
	//Ensure valid directory
	dir = validateDir(dir);
	//Retrieve all the files
	var files = globJsonFiles(dir, pattern, opts);

	//Filter out and parse all .json files
	files.forEach(function(file) {
		//Read all the json files, and assign their values to a data object with their name as id.
		var currentObject = data;
		var dirName = path.dirname(file);
		var baseName = varname.camelback(path.basename(file, '.json'));

		//If .json is located in a subdirectory, create object from the dir names.
		if (dirName != ".") {
			currentObject = data;
			var parts = dirName.split(path.sep);
			var partName;
			for (var i = 0; i < parts.length; i++) {
				partName = varname.camelback(parts[i]); //Convert to valid camel back name.
				if (!currentObject[partName]) currentObject[partName] = {};
				currentObject = currentObject[partName];
			}
		}

		//Parse the JSON
		currentObject[baseName] = readJson(dir + file);
	});

	return data;
};

/**
 * Reads all the json files in a directory, including subdirectories, and merges the json data into a single object. This maintains the exact structure of the .json files.
 * This will overwrite duplicate property names.
 * @param dir {string} String directory to look up. Does not support globbing.
 * @param pattern {string=} Glob to use for finding .json files. Default: '**\/*.json'
 * @param opts {object=} Globbing options. By default 'cwd' will be set to root directory.
 * @return {object}
 */
exports.merge = function(dir, pattern, opts) {
	var data = {};
	//Ensure valid directory
	dir = validateDir(dir);
	//Retrieve all the files
	var files = globJsonFiles(dir, pattern, opts);

	//Filter out and parse all .json files
	files.forEach(function(file) {
		//Parse the JSON
		extend(true, data, readJson(dir + file));
	});

	return data;
};


/*******************
 * PRIVATE METHODS
 *******************/

/**
 * Ensures the correct path ending in the directory
 * @param dir
 * @returns {*}
 */
function validateDir(dir) {
	if (!dir) return null;
	if (dir.indexOf(dir.length-1) != "/") dir += "/";
	return dir;
}

function globJsonFiles(dir, pattern, opts) {
	opts = opts || {};
	pattern = pattern || '**/*.json';
	opts.cwd = opts.cwd || dir;
	return glob.sync(pattern, opts);
}

function readJson(filepath) {
	return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}