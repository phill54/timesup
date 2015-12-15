'use strict';

require.config({
	baseUrl: '/js-src/app',
	paths: {
		jquery: '../deps/jquery/dist/jquery.min',
		text: '../deps/requirejs-text/text',
		css: '../deps/requirejs-css/css',
		requireLib: '../deps/requirejs/require',
		bootstrap: '../deps/bootstrap/dist/js/bootstrap',
		webix: '../deps/webix/codebase/webix_debug',
		json: '../deps/json2-bower/json2',
		tpl: '../tpl/',
		data:'../../data/',
		howler: '../deps/howler/howler.min'
	},
	shim: {
		"jquery": {
			"exports": "jQuery"
		},
		"css": {
			"deps": ['text']
		},
		"bootstrap": {
			"deps": [
				"jquery"
				//'css!../deps/bootstrap/dist/css/bootstrap.css',
				//'css!../deps/bootstrap/dist/css/bootstrap-theme.css'
			],
			"exports": "$.fn.popover"
		},
		json: {
			exports: 'JSON'
		}
	},
	enforceDefine: true
});
