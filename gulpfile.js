var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	cssnano     = require('gulp-cssnano'),
	rename	    = require('gulp-rename'),
	del			= require('del'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function() {
	return gulp.src('app/css/main.css')
	.pipe(autoprefixer({
			browsers: ['last 15 versions',
					   '> 1%',
					   'ie 8',
					   'ie 7'
		   			  ], 
			cascade:true
		}))
	.pipe(cssnano())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
})

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		port: 8080
	})
});

gulp.task('clean', function () {
	return del.sync('dist')
})

gulp.task('watch', ['browser-sync', 'css'], function() {
	gulp.watch('app/css/main.css', ['css']);
	gulp.watch('app/*.html', browserSync.reload);
})

gulp.task('build',['clean','css'] , function() {

	var buildCss = gulp.src([
			'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist/'))

})