define('db/termmanager', [
	'bongo'
	,'json!data/terms/movies.json'
	,'json!data/terms/persons.json'
	,'hbs!tpl/menu'
], function (bongo, movies, persons, menu)
{
	if (!bongo.supported) return false;

	var manager = {},
		db;

	document.bongo = bongo;

	// db = bongo.db({
	// 	name: 'timesup',
	// 	collections: ['terms', 'collections']
	// });
	//
	//
	// bongo.db('timesup').collection('collections').insert({
	// 	name: 'Filme',
	// 	language: 'de'
	// });
	//
	// bongo.db('timesup').collection('collections').find().toArray(function (error, result) {
	// 	console.log('result');
	// });

	// bongo.db('timesup').collection('terms').insert({
	// 	term: 'Manhattan',
	// 	lastUsed: new Date()
	// });
	console.log(bongo);
	// console.log(menu);
	// console.log('manager', manager);
	return manager;
});
