const gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	minhtml = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})
gulp.task('scss', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
	      stream: true
	    }));
});
gulp.task('js', function(){
	return gulp.src('app/js/com/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
	      stream: true
	    }));
});
gulp.task('pug', function(){
	return gulp.src('app/views/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({
	      stream: true
	    }));
})
gulp.task('watch', ['browserSync', 'scss', 'js', 'pug'], function(){
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/js/com/*.js', ['js']);
	gulp.watch('app/views/**/*.pug', ['pug']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('repljs', function(cb){
	pump([
			gulp.src('app/js/script.js'),
			gulp.dest('dist/js')
		],cb)
});
gulp.task('mincss',function(cb){
	pump([
			gulp.src('app/css/**/*.css'),
			autoprefixer({
				browsers: ['last 20 versions'],
            	cascade: false
			}),
			cleanCSS({compatibility: 'ie8'}),
			gulp.dest('dist/css')
		],cb)
})
gulp.task('minimg', function(cb){
	pump([
			gulp.src('app/img/*.+(png|jpg|gif|svg)'),
			imagemin({
				interlaced: true
			}),
			gulp.dest('dist/img')
		],cb)
})
gulp.task('replhtml',function(cb){
	pump([
			gulp.src('app/*.html'),
			gulp.dest('dist')
		],cb)
})
gulp.task('replvendor', function(cb){
	pump([
			gulp.src('app/js/vendor/*.js'),
			gulp.dest('dist/js/vendor')
		],cb)
});
gulp.task('replfonts', function(cb){
	pump([
			gulp.src('app/fonts/**/*'),
			gulp.dest('dist/fonts')
		],cb)
});
gulp.task('replscss', function(cb){
	pump([
			gulp.src('app/scss/**/*.scss'),
			gulp.dest('dist/scss')
		],cb)
})
gulp.task('replcss', function(cb){
	pump([
			gulp.src('app/css/**/*'),
			gulp.dest('dist/css')
		],cb)
})

gulp.task('prod', ['repljs','minimg','replhtml','replvendor','replfonts','replscss','replcss'],function(){
	console.log('To Production!')
})

gulp.task('default', function() {

});