var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('./src/**/*.scss', {base: './src'})
	.pipe(sass())
	.pipe(gulp.dest('./src'))
})

gulp.task('sass:watch', function() {
	gulp.watch('./src/**/*.scss', ['sass']);
})