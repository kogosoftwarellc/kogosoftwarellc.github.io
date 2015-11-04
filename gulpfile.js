var gulp = require('gulp');
var jade = require('gulp-jade');
var path = require('path');
var runSequence = require('run-sequence');

var SRC_DIR = path.resolve(__dirname, 'src');
var PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  pages: path.resolve(SRC_DIR, 'pages'),
  src: SRC_DIR,
  static: path.resolve(SRC_DIR, 'static')
};

gulp.task('build:pages', function() {
  return gulp.src(PATHS.pages + '/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build:static', function() {
  return gulp.src(PATHS.static + '/*')
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build', function(cb) {
  runSequence(
    ['build:pages', 'build:static'],
    cb);
});
