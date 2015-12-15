var gulp = require('gulp-help')(require('gulp')),
    path = require('path'),
    fs = require('fs'),
    extend = require('extend'),
    rjs = require('gulp-requirejs'),
    less = require('gulp-less'),
    // cssjoin = require('gulp-cssjoin'),
    // cssimport = require('gulp-cssimport'),
    importcss = require('gulp-import-css'),
    gutil = require('gulp-util'),
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
            webix: '../deps/webix/codebase/webix_debug',
            json: '../deps/json2-bower/json2',
            tpl: '../tpl/',
            data:'../../data/',
            normalize: '../deps/requirejs-css/normalize',
            'css-builder': '../deps/requirejs-css/css-builder',
            howler: '../deps/howler/howler.min'
        },
        inlineText: true,
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
                    // 'css!../deps/bootstrap/dist/css/bootstrap.css',
                    // 'css!../deps/bootstrap/dist/css/bootstrap-theme.css'
                ],
                "exports": "$.fn.popover"
            },
            json: {
                exports: 'JSON'
            }
        },
        deps: ["requireLib", "text", "../config.dist"],
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
        out: 'app.js'
    }))
        .pipe(uglify()).on('error', gutil.log)
        .pipe(gulp.dest(config.destPath));

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