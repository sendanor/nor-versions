/** Versions code */

var fs = require('nor-fs');
var path = require('path');

/** Returns the current package version on disk */
function pkg_version_on_disk(file) {
	var data = fs.sync.readFile( file, {'encoding':'utf8'});
	try {
		data = JSON.parse(data);
		return data.version;
	} catch(e) {
		return;
	}
}

// Exports
var versions = module.exports = {};

/** */
versions.getAppName = function() {
	return process.env.npm_package_name;
};

/** Returns current versions */
versions.get = function(file) {
	var result = {};
	result[versions.getAppName() + '@fs'] = pkg_version_on_disk(file);
	result[versions.getAppName() + '@backend'] = process.env.npm_package_version;
	result['node@backend'] = process.env.npm_config_node_version.replace(/^v/, "");
	return result;
};

/* EOF */
