"use strict";

var gulp = require('gulp'),
 concatCss = require('gulp-concat-css'),
 minifyCss = require('gulp-minify-css'),
 rename = require('gulp-rename'),
 prefix = require('gulp-autoprefixer'),
 livereload = require('gulp-livereload'),
 connect = require('gulp-connect'),
 wiredep = require('wiredep').stream,//вставляет в index.html ссылки на файлы из bower
 useref = require('gulp-useref'),//Плагин постоения ссылок на скрипты и стили
 uglify = require('gulp-uglify'),//Плагин, минифицирующий javascript
 gulpif = require('gulp-if'),//Плагин, фильтрующий подключенные к index.html файлы
 sass = require('gulp-sass'),//Плагин, позволяющий работать с sass предпроцессором
 rev_append = require('gulp-rev-append'),//Плагин для очистки кеширования файлов
 notify = require('gulp-notify'),
 clean = require('gulp-clean'),//Для очистки папки dist
 sftp = require('gulp-sftp');

//sftp
 gulp.task('sftp', function () {
    return gulp.src('dist')
        .pipe(sftp({
            host: 'plasma.beget.ru',
            user: 'delfinm5',
            pass: 'MUh93csP',
            remotePath:'/delfintimes.ru/public_html'
        }));
});

//clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//wiredep
  gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({
      directory:"app/bower"
    }))
    .pipe(gulp.dest('app/'));
});

//Build
gulp.task('build',['clean'], function(){
  var assets = useref.assets()

  return gulp.src('app/*.html') 
  .pipe(assets)
  .pipe(gulpif('*.js', uglify()))
  .pipe(gulpif('*.css', minifyCss()))
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(gulp.dest('dist'));
})

//server connect
 	gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//clear cash
gulp.task('rev_append', function() {
  gulp.src('app/*.html')
    .pipe(rev_append())
});

//css
	gulp.task('css', function () {
    //gulp.src('scss/style.scss') путь для sass, в папку scss вложена папка settings с файлом _settings.scss, вызывается через gulp css
    //.pipe(sass()) //вызов sass
     gulp.src('app/css/*.css')
    .pipe(concatCss('bundle.css')) 
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('app/'))
    .pipe(prefix('last 2 versions','>1%','ie 9'))
    .pipe(connect.reload());
    //.pipe(notify('Done!'));
});
//html
gulp.task('html', function () {
    gulp.src('app/*.html')
    .pipe(connect.reload());
});

//watch - следит и автоматически запускает gulp при изменении файлов
gulp.task('watch', function(){
	gulp.watch('app/css/*.css', ['css'])
	gulp.watch('app/*.html', ['html'])
  gulp.watch('bower.json', ['bower'])
})

//default
gulp.task('default', ['connect','css', 'watch','html']);