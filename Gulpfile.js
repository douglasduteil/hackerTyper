/* jshint node : true */

'use strict';

var gulp = require('gulp');
var http = require('http');
var path = require('path');

// More libs for gulp !
// Load plugins
var $ = require('gulp-load-plugins')();
var ngmin = require('ngmin');
var lr = require('tiny-lr');
var ecstatic = require('ecstatic');

gulp.task('connect', $.connect.server({
  root: ['demo'],
  port: 9000,
  livereload: true
}));

gulp.task('html', function () {
  gulp.src('./demo/*.html')
    .pipe($.connect.reload());
});

// Watch
gulp.task('default', ['connect'], function () {
  // Watch for changes in `demo` folder
  gulp.watch('demo/**/*.html', ['html']);
});
