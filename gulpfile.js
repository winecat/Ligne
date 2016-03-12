'use strict';

var gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

/**
 * Watch changing
 */
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/**', ['images']);
});

/**
 * Build assets, will clean all files first
 */
gulp.task('build', ['clean'], function() {
  gulp.start('publish-css','publish-js','publish-img');
});

/**
 * Clean task
 */
gulp.task('clean', function(cb) {
    del('dist/', cb)
});

/**
 * Build CSS
 */
gulp.task('publish-css', function () {
  return gulp.src('assets/src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/dist/css'));
});

/**
 * Build JS
 */
gulp.task('publish-js', function () {
  return gulp.src('assets/src/js/*.js')
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/dist/js'));
});

/**
 * Build images
 */
gulp.task('publish-img', function () {
  return gulp.src('assets/src/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('assets/dist/images'));
});
