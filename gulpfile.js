var gulp = require('gulp-help')(require('gulp')),
    path = require('path'),
    fs = require('fs'),
    extend = require('extend'),
    rjs = require('gulp-requirejs'),
    less = require('gulp-less'),
    manifest = require('gulp-manifest'),
	ftpconfig = require('./gulp/ftp'),
    // cssjoin = require('gulp-cssjoin'),
    // cssimport = require('gulp-cssimport'),
    importcss = require('gulp-import-css'),
    gutil = require('gulp-util'),
	ftp = require('vinyl-ftp'),
    uglify = require('gulp-uglify'),
    config = {
        publicPath: 'public/',
        destPath: 'public/js/',
        srcPath: 'public/js-src/',
        deps: 'deps/'
    },
    rjsConfig = {
        baseUrl: config.srcPath + 'app/',
        paths: {
			jquery: '../deps/jquery/dist/jquery.min',
			text: '../deps/requirejs-text/text',
			css: '../deps/requirejs-css/css',
			requireLib: '../deps/almond/almond',
			bootstrap: '../deps/bootstrap/dist/js/bootstrap',
			tpl: '../tpl/',
			data:'../../data/',
			normalize: '../deps/requirejs-css/normalize',
			'css-builder': '../deps/requirejs-css/css-builder',
			howler: '../deps/howler/howler.min',
			bongo: '../deps/bongo/dist/bongo.min',
			nosleep: '../deps/nosleep/NoSleep.min',
			json: '../deps/requirejs-plugins/src/json'
        },
        inlineText: true,
        shim: {
            "jquery": {
                "exports": "jQuery"
            },
			"nosleep": {
                "exports": "NoSleep"
            },
            "css": {
                "deps": ['text']
            },
            "bootstrap": {
                "deps": [
                    "jquery"
                    // 'css!../deps/bootstrap/dist/css/bootstrap.css',
                    // 'css!../deps/bootstrap/dist/css/bootstrap-theme.css'
                ],
                "exports": "$.fn.popover"
            }
        },
        deps: ["requireLib", "../config.dist"],
        enforceDefine: true
    };

/**
 * helper function recursive delete
 *
 * @param path
 */
function deleteFolderRecursive (path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


gulp.task('rmbuild', 'remove previous build folder', function () {
    deleteFolderRecursive(config.destPath);
});

gulp.task('manifest', 'refresh manifest file', function () {
	return gulp.src([
		'public/js/app.js',
		'public/css/main.css',
		'public/data/audio/*'
	],{
		base: 'public/'
	}).pipe(manifest({
		hash: true,
		preferOnline: true,
		network: ['*'],
		filename: 'cache.manifest',
		exclude: 'cache.manifest'
	})).pipe(gulp.dest('public'));
});

gulp.task('buildcss', 'builds css for master layout', [
    'rmbuild'
], function () {
    return 	gulp.src([config.publicPath + 'css/main.less'])
        .pipe(less({
            compress: false
        }).on('error', gutil.log))
        .pipe(importcss())
        .pipe(gulp.dest(config.publicPath + 'css/'))
});

gulp.task('buildmaster', 'builds js for master layout', [
    'rmbuild', 'buildcss'
], function () {
    var includes = ['main'];

    return rjs(extend(true, {}, rjsConfig, {
        include: includes,
		insertRequire: includes,
        out: 'app.js'
    }))
		// .pipe(uglify()).on('error', gutil.log)
		.pipe(gulp.dest(config.destPath));

});

gulp.task('deploy', function () {
	var conn = ftp.create(ftpconfig);

	var globs = [
		'js/app.js'
		,'css/main.css'
		,'data/audio/*'
		,'cache.manifest'
		,'index.php'
	];

	return gulp.src(globs, {
		cwd: 'public',
		base: 'public',
		buffer: false
	})
	.pipe(conn.newer('/'))
	.pipe(conn.dest('/'));
});

//
//gulp.task('importcss', 'import css for master layout', ['buildcss'], function() {
//    // default usage
//    return gulp.src(config.publicPath + 'css/main.css')
//        .pipe(cssjoin())
//        .pipe(gulp.dest(config.publicPath + 'css/main-all.css'));
//});


gulp.task('default', 'default task', ['buildmaster'], function () {
    // nothing yet
});
