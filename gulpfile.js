"use strict";

var gulp = require('gulp'),
 concatCss = require('gulp-concat-css'),
 minifyCss = require('gulp-minify-css'),
 rename = require('gulp-rename'),
 prefix = require('gulp-autoprefixer'),
 livereload = require('gulp-livereload'),
 connect = require('gulp-connect'),
 notify = require('gulp-notify');

//server connect
 	gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
	gulp.task('css', function () {
  	 gulp.src('app/css/*.css')
    .pipe(concatCss('bundle.css'))//Вызов соответствующей функции
    .pipe(minifyCss())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('app/'))
    .pipe(prefix('last 2 versions','>1%','ie 9'))
    .pipe(connect.reload());
    //.pipe(notify('Done!'));
});

//html
gulp.task('html', function(){
	gulp.src('app/index.html')
  gulp.src('app/work.html')
  gulp.src('app/contact.html')
	.pipe(connect.reload());
})

//watch - следит и автоматически запускает gulp при изменении css файлов
gulp.task('watch', function(){
	gulp.watch('app/css/*.css', ['css'])
	gulp.watch('app/index.html', ['html'])
})

//default
gulp.task('default', ['connect', 'html','css', 'watch']);