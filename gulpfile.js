var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var prefixer = require('gulp-autoprefixer');

gulp.task('css', function(){
  return gulp.src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(prefixer({ browsers: 'last 2 versions' }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
  return gulp.src('assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css', 'js' ]);
