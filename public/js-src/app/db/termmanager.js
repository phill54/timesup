'use strict';

define('db/termmanager', [
	'json!data/terms/movies.json'
	,'json!data/terms/persons.json'
	,'hbs!tpl/menu'
], function (movies, persons, menu)
{
	var manager = {};
	console.log(menu);
	// console.log('manager', manager);
	return manager;
});
