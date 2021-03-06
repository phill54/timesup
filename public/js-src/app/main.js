'use strict';

define('main', [
	'jquery',
	'db/termmanager',
	'jquery.mobile',
	'hbs!tpl/jqm/body'
	// ,'bongo'
	// ,'bootstrap'
	// ,'nosleep'
	// ,'json!data/terms/movies.json'
	// ,'json!data/terms/persons.json'
	// ,'howler'
	// ,'db/termmanager'
	// ,'text!tpl/contents.html'
], function (
	$,
	termmanager,
	jqmobile,
	tplBody /*, bongo, bootstrap, NoSleep, movies, persons, howler, termmanager*/
) {
	
	// $('body').html(tplBody());


	// var game = $('div.game'),
	// 	round = 1,
	// 	team = 'a',
	// 	currentTerm,
	// 	terms,
	// 	caffein = new NoSleep(),
	// 	currentTermCount = 0,
	// 	timerCountdown,
	// 	timerTtl = 30,
	// 	termCount = 40,
	// 	timerContainer = $('p.timer'),
	// 	timerInterval,
	// 	startBtn = $('button[action="startTimer"]'),
	// 	//newGameBtn = $('a[action="newGame"]'),
	// 	scorePrevTermBtn = $('a[action="scorePrevTerm"]'),
	// 	setTermsPersonsBtn = $('a[action="setTermsPersons"]'),
	// 	setTermsMoviesBtn = $('a[action="setTermsMovies"]'),
	// 	// cancelCardBtn = $('button[action="cancelCard"]'),
	// 	nextCardBtn = $('button[action="nextCard"]'),
	// 	scores = {
	// 		'round-1': {
	// 			'team-a': 0,
	// 			'team-b': 0
	// 		},
	// 		'round-2': {
	// 			'team-a': 0,
	// 			'team-b': 0
	// 		},
	// 		'round-3': {
	// 			'team-a': 0,
	// 			'team-b': 0
	// 		}
	// 	},
	// 	termStack,
	// 	buzzer = new howler.Howl({
	// 		// src: ['data:audio/mp3;base64,' + buzzerData]
	// 		src: ['data/audio/buzzer.mp3']
	// 	}),
	// 	roundStack;
	//
	// terms = movies;
	//
	// function startTurn() {
	// 	startTimer();
	// 	showCard();
	// }
	//
	// function enableCaffein() {
	// 	caffein.enable();
	// 	document.removeEventListener('touchstart', enableCaffein, false);
	// }
	//
	// function startTimer() {
	// 	clearInterval(timerInterval);
	// 	document.addEventListener('touchstart', enableCaffein, false);
	// 	timerCountdown = timerTtl;
	// 	timerInterval = setInterval(function () {
	// 		timerContainer.html(timerCountdown);
	// 		if (timerCountdown === 0) {
	// 			clearInterval(timerInterval);
	// 			caffein.disable();
	// 			game.trigger('timesup');
	// 		}
	// 		if (timerCountdown === 3) {
	// 			buzzer.play();
	// 		}
	// 		timerCountdown--;
	// 	}, 1000);
	//
	// 	startBtn.attr('disabled', 1);
	// 	nextCardBtn.removeAttr('disabled');
	// 	// cancelCardBtn.removeAttr('disabled');
	// }
	//
	// game.on('timesup', function () {
	// 	if (currentTerm && currentTermCount == 0) {
	// 		roundStack.unshift(currentTerm);
	// 	}
	// 	team = team === 'a' ? 'b' : 'a';
	// 	$('h1.term').html('Nächstes Team');
	// 	startBtn.removeAttr('disabled');
	// 	nextCardBtn.attr('disabled', 1);
	// 	buzzer.play();
	//
	// 	if (roundStack.length === 0) {
	// 		if (round < 3) {
	// 			round++;
	// 			roundStack = shuffle(termStack.slice(0));
	//
	// 			$('h1.term').html('Nächste Runde');
	// 			var scoreA = $('td.score.total.team-a').html(),
	// 				scoreB = $('td.score.total.team-b').html();
	// 			if (scoreA >= scoreB) {
	// 				team = 'b';
	// 			} else {
	// 				team = 'a';
	// 			}
	// 		} else {
	// 			$('h1.term').html('ENDE');
	// 			startBtn.attr('disabled', 1);
	// 		}
	// 	}
	// 	refreshScoreBoard();
	// 	refreshInfo();
	// });
	//
	// function shuffle(o){
	// 	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	// 	return o;
	// }
	//
	// function newGame() {
	// 	termStack = getInitialTerms(terms.terms);
	// 	roundStack = shuffle(termStack.slice(0));
	// 	timerContainer.html(timerTtl);
	// 	resetScores();
	// 	refreshScoreBoard();
	// 	refreshInfo();
	// }
	//
	// function showCard() {
	// 	var newTerm = roundStack.shift();
	// 	if (newTerm == currentTerm) {
	// 		currentTermCount++;
	// 	} else {
	// 		currentTermCount = 0;
	// 	}
	// 	currentTerm = newTerm;
	// 	$('h1.term').html(currentTerm);
	// 	refreshScoreBoard();
	// 	refreshInfo();
	// }
	//
	// function nextCard() {
	// 	var newTerm = roundStack.shift();
	// 	if (currentTerm == newTerm) {
	// 		currentTermCount++;
	// 	} else {
	// 		currentTermCount = 0;
	// 	}
	// 	currentTerm = newTerm;
	//
	// 	if (currentTerm) {
	// 		$('h1.term').html(currentTerm);
	// 	} else {
	// 		if (timerCountdown > 5) {
	// 			timerCountdown = 2;
	// 		}
	// 		$('h1.term').html('');
	// 		nextCardBtn.attr('disabled', 1);
	// 	}
	// 	scores['round-' + round]['team-' + team]++;
	// 	refreshScoreBoard();
	// 	refreshInfo();
	// }
	//
	// function resetScores() {
	// 	scores['round-1']['team-a'] = 0;
	// 	scores['round-1']['team-b'] = 0;
	// 	scores['round-2']['team-a'] = 0;
	// 	scores['round-2']['team-b'] = 0;
	// 	scores['round-3']['team-a'] = 0;
	// 	scores['round-3']['team-b'] = 0;
	// }
	//
	// function refreshScoreBoard() {
	// 	var totalA = 0,
	// 		totalB = 0;
	//
	// 	for (var round in scores) {
	// 		for (var team in scores[round]) {
	// 			$('td.score.' + round + '.' + team).html(scores[round][team]);
	// 			if (team === 'team-a') {
	// 				totalA += scores[round][team];
	// 			} else if (team === 'team-b') {
	// 				totalB += scores[round][team];
	// 			}
	// 		}
	// 	}
	//
	// 	$('td.score.total.team-a').html(totalA);
	// 	$('td.score.total.team-b').html(totalB);
	// }
	//
	// function refreshInfo() {
	// 	$('h3.info span.round').html('Runde ' + round);
	// 	$('h3.info span.team').html('Team ' + team.toUpperCase());
	// 	$('h3.info span.badge').html(roundStack.length);
	// }
	//
	// function getInitialTerms(terms) {
	// 	var counter = 0,
	// 		termIds = {},
	// 		termStack = [],
	// 		pos;
	//
	// 	while (counter < termCount) {
	// 		pos = Math.floor(Math.random() * terms.length);
	// 		if (!termIds.hasOwnProperty(pos)) {
	// 			termIds[pos] = pos;
	// 			counter++;
	// 		}
	// 	}
	//
	// 	for (pos in termIds) {
	// 		termStack.push(terms[pos]);
	// 	}
	// 	return termStack;
	// }
	//
	// function onNewGame() {
	// 	var scoreA = $('td.score.total.team-a').html(),
	// 		scoreB = $('td.score.total.team-b').html();
	// 	if (scoreA >= scoreB) {
	// 		team = 'b';
	// 	} else {
	// 		team = 'a';
	// 	}
	// 	clearInterval(timerInterval);
	// 	newGame();
	// 	$('h1.term').html('NEUES SPIEL');
	// 	startBtn.removeAttr('disabled');
	// 	nextCardBtn.attr('disabled', 1);
	// 	round = 1;
	// 	$('button.navbar-toggle').trigger('click');
	// 	return false;
	// }
	//
	// //function onScorePrevTerm() {
	// //	refreshScoreBoard();
	// //	refreshInfo();
	// //	return false;
	// //}
	//
	// function setTermsMovies() {
	// 	terms = movies;
	// 	return onNewGame();
	// }
	// function setTermsPersons() {
	// 	terms = persons;
	// 	return onNewGame();
	// }
	//
	//
	// newGame();
	// startBtn.on('click', startTurn);
	// nextCardBtn.on('click', nextCard);
	// //newGameBtn.on('click', onNewGame);
	// //scorePrevTermBtn.on('click', onScorePrevTerm);
	// setTermsMoviesBtn.on('click', setTermsMovies);
	// setTermsPersonsBtn.on('click', setTermsPersons);

	// if (bongo.supported) {
	// 	var db = bongo.db({
	// 		name: 'timesup',
	// 		objectStores: ['terms']
	// 	});
	// 	db.terms.insert({
	// 		term: 'Fantasia',
	// 		counter: 0
	// 	}, function (error, id) {
	// 		if (!error) {
	// 			console.log('id', id);
	// 			// db.collection('terms').save({
	// 			// 	_id: id,
	// 			// 	term: 'Fantasia2',
	// 			// 	counter: 1
	// 			// });
	// 			/*, function (error, id) {
	// 				if (!error) {
	// 					console.log('saved again', id);
	// 				} else {
	// 					console.error(error);
	// 				}
	// 			}*/
	// 		} else {
	// 			console.error(error);
	// 		}
	// 	});
	// 	setTimeout(function () {
	// 		db.terms.find(function (error, data) {
	// 			if (error) {
	// 				console.error(error);
	// 				return;
	// 			}
	// 			console.log(data);
	// 		});
	// 		console.log(
	// 			db.terms
	// 		);
	// 	}, 2000);
	//
	// 	console.log('database', db);
	// 	// var db = bongo.db({
	// 	// 	name: 'timesup',
	// 	// 	collections: ['terms']
	// 	// });
	// }
});
