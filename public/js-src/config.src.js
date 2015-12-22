'use strict';

require.config({
	baseUrl: '/js-src/app',
	paths: {
		jquery: '../deps/jquery/dist/jquery.min',
		text: '../deps/requirejs-text/text',
		css: '../deps/requirejs-css/css',
		requireLib: '../deps/requirejs/require',
		bootstrap: '../deps/bootstrap/dist/js/bootstrap',
		json: '../deps/json2-bower/json2',
		tpl: '../tpl/',
		data:'../../data/',
		howler: '../deps/howler/howler.min',
		bongo: '../deps/bongo/dist/bongo.min',
		nosleep: '../deps/nosleep/NoSleep.min'
	},
	shim: {
		"jquery": {
			"exports": "jQuery"
		},
		"css": {
			"deps": ['text']
		},
		"nosleep": {
			"exports": "NoSleep"
		},
		"bootstrap": {
			"deps": [
				"jquery"
				//'css!../deps/bootstrap/dist/css/bootstrap.css',
				//'css!../deps/bootstrap/dist/css/bootstrap-theme.css'
			],
			"exports": "$.fn.popover"
		},
		"json": {
			exports: 'JSON'
		}
	},
	deps: ['main'],
	enforceDefine: true
});
