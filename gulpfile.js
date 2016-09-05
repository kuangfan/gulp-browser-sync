//include gulp
var gulp = require('gulp'); 

//include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

//JS代码检查
gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});
//JS代码压缩并合并
gulp.task('scripts', function() {
  gulp.src(['./src/js/*.js'])
    .pipe(concat('global.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dest/js/'));
});
//CSS代码压缩并合并，添加css3前缀
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dest/css/'));
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//gulp default task
gulp.task('default', [ 'scripts', 'styles', 'browser-sync'], function() {   	
	//监控代码改变重载浏览器
	gulp.watch(['./*.html','./src/js/*.js','./src/css/*.css'], browserSync.reload);
	//监控JS代码改变
	gulp.watch('./src/js/*.js', function() {
    	//gulp.run('jshint', 'scripts');
  });
	//监控CSS代码改变
  gulp.watch('./src/css/*.css', function() {
      gulp.run('styles');
	});
});