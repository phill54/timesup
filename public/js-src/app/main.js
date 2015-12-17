'use strict';

define('main', [
    'jquery'
    ,'bootstrap'
    ,'json'
    ,'text!data/terms/movies.json'
    ,'text!data/terms/persons.json'
    ,'buzzer'
    ,'howler'
    // ,'text!tpl/contents.html'
], function ($, bootstrap, json, movies, persons, buzzerData, howler) {

    var game = $('div.game'),
        round = 1,
        team = 'a',
        currentTerm,
        terms,
        currentTermCount = 0,
        timerCountdown,
        timerTtl = 30,
        termCount = 40,
        timerContainer = $('p.timer'),
        timerInterval,
        startBtn = $('button[action="startTimer"]'),
        newGameBtn = $('a[action="newGame"]'),
        scorePrevTermBtn = $('a[action="scorePrevTerm"]'),
        setTermsPersonsBtn = $('a[action="setTermsPersons"]'),
        setTermsMoviesBtn = $('a[action="setTermsMovies"]'),
        // cancelCardBtn = $('button[action="cancelCard"]'),
        nextCardBtn = $('button[action="nextCard"]'),
        scores = {
            'round-1': {
                'team-a': 0,
                'team-b': 0
            },
            'round-2': {
                'team-a': 0,
                'team-b': 0
            },
            'round-3': {
                'team-a': 0,
                'team-b': 0
            }
        },
        termStack,
        buzzer = new howler.Howl({
            //urls: ['data:audio/mp3;base64,' + buzzerData]
            src: ['data:audio/mp3;base64,' + buzzerData]
            //src: ['data/buzzer.mp3']
        }),
        //buzzer = new Audio('data:audio/mp3;base64,' + buzzerData),
        //buzzerSource = document.createElement('source'),
        roundStack;

    movies = json.parse(movies);
    persons = json.parse(persons);
    terms = movies;
    //buzzerSource.type = 'audio/mpeg';
    //buzzerSource.src = 'data:audio/mp3;base64,' + buzzerData;
    //buzzerSource.src = 'data/buzzer.mp3';
    //buzzer.appendChild(buzzerSource);
    //buzzer.preload = null;
    //buzzer.load();

    function startTurn() {
        startTimer();
        showCard();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerCountdown = timerTtl;
        timerInterval = setInterval(function () {
            timerContainer.html(timerCountdown);
            if (timerCountdown === 0) {
                clearInterval(timerInterval);
                game.trigger('timesup');
            }
            if (timerCountdown === 3) {
                buzzer.play();
            }
            timerCountdown--;
        }, 1000);

        startBtn.attr('disabled', 1);
        nextCardBtn.removeAttr('disabled');
        // cancelCardBtn.removeAttr('disabled');
    }

    game.on('timesup', function () {
        if (currentTerm && currentTermCount == 0) {
            roundStack.unshift(currentTerm);
        }
        team = team === 'a' ? 'b' : 'a';
        $('h1.term').html('Nächstes Team');
        startBtn.removeAttr('disabled');
        nextCardBtn.attr('disabled', 1);
        buzzer.play();

        if (roundStack.length === 0) {
            if (round < 3) {
                round++;
                roundStack = shuffle(termStack.slice(0));

                $('h1.term').html('Nächste Runde');
                var scoreA = $('td.score.total.team-a').html(),
                    scoreB = $('td.score.total.team-b').html();
                if (scoreA >= scoreB) {
                    team = 'b';
                } else {
                    team = 'a';
                }
            } else {
                $('h1.term').html('ENDE');
                startBtn.attr('disabled', 1);
            }
        }
        refreshScoreBoard();
        refreshInfo();
    });

    function shuffle(o){
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function newGame() {
        termStack = getInitialTerms(terms.terms);
        roundStack = shuffle(termStack.slice(0));
        timerContainer.html(timerTtl);
        resetScores();
        refreshScoreBoard();
        refreshInfo();
    }

    function showCard() {
        var newTerm = roundStack.shift();
        if (newTerm == currentTerm) {
            currentTermCount++;
        } else {
            currentTermCount = 0;
        }
        currentTerm = newTerm;
        $('h1.term').html(currentTerm);
        refreshScoreBoard();
        refreshInfo();
    }

    function nextCard() {
        var newTerm = roundStack.shift();
        if (currentTerm == newTerm) {
            currentTermCount++;
        } else {
            currentTermCount = 0;
        }
        currentTerm = newTerm;

        if (currentTerm) {
            $('h1.term').html(currentTerm);
        } else {
            if (timerCountdown > 5) {
                timerCountdown = 2;
            }
            $('h1.term').html('');
            nextCardBtn.attr('disabled', 1);
        }
        scores['round-' + round]['team-' + team]++;
        refreshScoreBoard();
        refreshInfo();
    }

    function resetScores() {
        scores['round-1']['team-a'] = 0;
        scores['round-1']['team-b'] = 0;
        scores['round-2']['team-a'] = 0;
        scores['round-2']['team-b'] = 0;
        scores['round-3']['team-a'] = 0;
        scores['round-3']['team-b'] = 0;
    }

    function refreshScoreBoard() {
        var totalA = 0,
            totalB = 0;

        for (var round in scores) {
            for (var team in scores[round]) {
                $('td.score.' + round + '.' + team).html(scores[round][team]);
                if (team === 'team-a') {
                    totalA += scores[round][team];
                } else if (team === 'team-b') {
                    totalB += scores[round][team];
                }
            }
        }

        $('td.score.total.team-a').html(totalA);
        $('td.score.total.team-b').html(totalB);
    }

    function refreshInfo() {
        $('h3.info span.round').html('Runde ' + round);
        $('h3.info span.team').html('Team ' + team.toUpperCase());
        $('h3.info span.badge').html(roundStack.length);
    }

    function getInitialTerms(terms) {
        var counter = 0,
            termIds = {},
            termStack = [],
            pos;

        while (counter < termCount) {
            pos = Math.floor(Math.random() * terms.length);
            if (!termIds.hasOwnProperty(pos)) {
                termIds[pos] = pos;
                counter++;
            }
        }

        for (pos in termIds) {
            termStack.push(terms[pos]);
        }
        return termStack;
    }

    function onNewGame() {
        var scoreA = $('td.score.total.team-a').html(),
            scoreB = $('td.score.total.team-b').html();
        if (scoreA >= scoreB) {
            team = 'b';
        } else {
            team = 'a';
        }
        clearInterval(timerInterval);
        newGame();
        $('h1.term').html('NEUES SPIEL');
        startBtn.removeAttr('disabled');
        nextCardBtn.attr('disabled', 1);
        round = 1;
        $('button.navbar-toggle').trigger('click');
        return false;
    }

    //function onScorePrevTerm() {
    //    refreshScoreBoard();
    //    refreshInfo();
    //    return false;
    //}

    function setTermsMovies() {
        terms = movies;
        onNewGame();
        return false;
    }
    function setTermsPersons() {
        terms = persons;
        onNewGame();
        return false;
    }


    newGame();
    startBtn.on('click', startTurn);
    nextCardBtn.on('click', nextCard);
    //newGameBtn.on('click', onNewGame);
    //scorePrevTermBtn.on('click', onScorePrevTerm);
    setTermsMoviesBtn.on('click', setTermsMovies);
    setTermsPersonsBtn.on('click', setTermsPersons);
});