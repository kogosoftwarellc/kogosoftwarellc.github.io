var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var cssimport = require('gulp-cssimport');
var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var SRC_DIR = path.resolve(__dirname, 'src');
var PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  pages: path.resolve(SRC_DIR, 'pages'),
  src: SRC_DIR,
  static: path.resolve(SRC_DIR, 'static'),
  js: path.resolve(SRC_DIR, 'js')
};

gulp.task('clean', function(cb) {
  return del([PATHS.dist]);
});

gulp.task('build:less', function() {
  return gulp.src(PATHS.src + '/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssimport())
    .pipe(concat('index.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.dist))
    .pipe(browserSync.stream());
});

gulp.task('build:pages', function() {
  return gulp.src(PATHS.pages + '/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build:scripts', function() {
  return gulp.src(PATHS.js + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.dist));
});


gulp.task('build:static', function() {
  return gulp.src(PATHS.static + '/**/*')
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build:pages:watch', ['build:pages'], browserSync.reload);

gulp.task('serve', ['clean', 'default'], function() {
  gulp.watch(PATHS.src + '/**/*.jade', ['build:pages:watch']);
  gulp.watch(PATHS.src + '/**/*.less', ['build:less']);
  gulp.watch(PATHS.src + '/**/*.jpg', ['build:static']);
  gulp.watch(PATHS.src + '/**/*.png', ['build:static']);
  gulp.watch(PATHS.src + '/**/*.svg', ['build:static']);
  gulp.watch(PATHS.src + '/**/*.js', ['build:scripts']);

  browserSync.init({server: PATHS.dist});
});

gulp.task('default', function(cb) {
  runSequence(
    'build:less',
    ['build:pages', 'build:static', 'build:scripts'],
    cb);
});
