var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var babel   = require('gulp-babel');
var nano    = require('gulp-cssnano');
var sass    = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('app/'))
});

gulp.task('sass', function() {
  gulp.src('sass/main.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./app/static/css/'));
});

gulp.task('normalize', function() {
  gulp.src('node_modules/normalize.css/normalize.css')
    // .pipe(nano())
    .pipe(gulp.dest('app/static/css/'));
});

gulp.task('fontstyles', function() {
  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('app/static/css/'));
});

gulp.task('fontfiles', function() {
  gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('app/static/fonts/'));
});

gulp.task('default', [
  'js',
  'sass',
  'normalize',
  'fontstyles',
  'fontfiles'
], function() {
  gulp.watch(['src/**/*.js'], ['js']);
  gulp.watch(['sass/**/*.scss'], ['sass']);
});

gulp.task('compile', [
  'js',
  'sass',
  'normalize',
  'fontstyles',
  'fontfiles'
]);
