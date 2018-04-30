var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var prefixer = require('gulp-autoprefixer');

var paths = {
    style_app: 'assets/scss/app.scss',
    styles: 'assets/scss/*.scss',
    scripts: 'assets/js/*.js',
}

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('css', function(){
  return gulp.src(paths.style_app)
    .pipe(sass())
    .on('error', onError)
    .pipe(prefixer({ browsers: 'last 2 versions' }))
    .pipe(minifyCSS())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch', function() {
    gulp.watch([paths.styles], ['css']);
    gulp.watch([paths.scripts], ['js']);
});

gulp.task('default', [ 'css', 'js' ]);
