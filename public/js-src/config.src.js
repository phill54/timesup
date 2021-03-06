'use strict';

require.config({
	baseUrl: '/js-src/app',
	paths: {
		jquery: '../deps/jquery/dist/jquery.min',
		"jquery.mobile": '../deps/jquery-mobile/js/jquery.mobile-1.4.5.min',
		text: '../deps/requirejs-text/text',
		css: '../deps/requirejs-css/css',
		requireLib: '../deps/requirejs/require',
		bootstrap: '../deps/bootstrap/dist/js/bootstrap',
		tpl: '../tpl/',
		data:'../../data/',
		howler: '../deps/howler/howler.min',
		bongo: '../deps/bongo/dist/bongo.min',
		nosleep: '../deps/nosleep/NoSleep.min',
		/* requirejs-plugins */
		// async: '../deps/requirejs-plugins/async',
        // font: '../deps/requirejs-plugins/font',
        // goog: '../deps/requirejs-plugins/goog',
        // image: '../deps/requirejs-plugins/image',
        json: '../deps/requirejs-plugins/src/json',
        // noext: '../deps/requirejs-plugins/noext',
        // mdown: '../deps/requirejs-plugins/lib/require/mdown',
        // propertyParser : '../deps/requirejs-plugins/lib/propertyParser',
        // markdownConverter : '../deps/requirejs-plugins/lib/Markdown.Converter',
		/* end of require-js-plugins */
		hbs: '../deps/handlebars/hbs'
	},
	shim: {
		"jquery": {
			"exports": "jQuery"
		},
		"jquery.mobile": {
			"depends": [
				"jquery:$"
			],
			"exports": "$.mobile"
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
		}
	},
	// hbs: {
	// 	helpers: true,            // default: true
	// 	templateExtension: 'hbs', // default: 'hbs'
	// 	partialsUrl: ''           // default: ''
	// },
	deps: ['main']
	// ,enforceDefine: true
});
