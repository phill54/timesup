'use strict';

define('db/termmanager', [
	'json!data/terms/movies.json'
	,'json!data/terms/persons.json'
], function (movies, persons)
{
	var manager = {};
	// console.log(arguments);
	// console.log('manager', manager);
	return manager;
});
