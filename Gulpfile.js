/* jshint node : true */

'use strict';

var gulp = require('gulp');
var http = require('http');
var path = require('path');

// More libs for gulp !
// Load plugins
var $ = require('gulp-load-plugins')();
var lr = require('tiny-lr');

gulp.task('connect', $.connect.server({
  root: ['bower_components', 'demo'],
  port: 9000,
  livereload: true
}));

gulp.task('html', function () {
  return gulp.src('demo/**/*.html')
    .pipe($.connect.reload());
});

gulp.task('css', ['prefix'], function () {
  gulp.src('demo/**/*.css')
    .pipe($.connect.reload());
});

gulp.task('less', function () {
  return gulp.src('demo/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('demo'));
});

gulp.task('prefix', ['less'], function () {
  return gulp.src('demo/**/*.css')
    .pipe($.autoprefixer('last 1 version', '> 1%'))
    .pipe(gulp.dest('demo'));
});

gulp.task('js', function () {
  return gulp.src('demo/**/*.js')
    .pipe($.connect.reload());
});

// Watch
gulp.task('default', ['connect'], function () {
  // Watch for changes in `demo` folder
  gulp.watch('demo/**/*.html', ['html']);
  gulp.watch('demo/**/*.less', ['css']);
  gulp.watch('demo/**/*.js', ['js']);
});
