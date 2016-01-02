var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var babel   = require('gulp-babel');
var sass    = require('gulp-sass');

var paths = {
  app:  'app/',
  css:  'app/static/css',
  font: 'app/static/fonts'
};

var tasks = [
  'js',
  'sass',
  'normalize',
  'highlightstyles',
  'fontstyles',
  'fontfiles'
];

gulp.task('js', function() {
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(paths.app))
});

gulp.task('sass', function() {
  gulp.src('sass/main.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('normalize', function() {
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest(paths.css));
});

gulp.task('highlightstyles', function() {
  gulp.src('node_modules/highlight.js/styles/monokai-sublime.css')
    .pipe(gulp.dest(paths.css));
});

gulp.task('fontstyles', function() {
  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(paths.css));
});

gulp.task('fontfiles', function() {
  gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest(paths.font));
});

gulp.task('default', tasks, function() {
  gulp.watch(['src/**/*.js'], ['js']);
  gulp.watch(['sass/**/*.scss'], ['sass']);
});

gulp.task('compile', tasks);
