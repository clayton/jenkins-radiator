/*
 * npm install gulp gulp-util gulp-concat gulp-coffee gulp-eco
 * run `gulp`
 *
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var eco = require('gulp-eco');
var shell = require('gulp-shell');

var paths = {
  packages: [
    'lib/init.js',
    'lib/templates.js',
    'lib/coffee.js'
  ],
  scripts: [
    'src/models/**/*.coffee',
    'src/collections/**/*.coffee',
    'src/views/**/*.coffee',
    'src/routers/**/*.coffee'
  ],
  specs: [
    'spec/**/*.coffee'
  ],
  spec_requirements: [
    'lib/spec_helper.js',
    'lib/templates.js',
    'lib/coffee.js',
    'lib/specs.js'
  ],
  templates: [
    'src/templates/**/*.eco'
  ]
};

gulp.task('scripts:init', function(){
  return gulp.src(['src/init.coffee'])
    .pipe(coffee({bare: true}))
    .pipe(concat('init.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(concat('coffee.js'))
    .pipe(gulp.dest('lib'));
});


gulp.task('templates', function(){
  return gulp.src(paths.templates)
    .pipe(eco())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('package', function(){
  return gulp.src(paths.packages)
    .pipe(concat('package.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:specs', function(){
  gulp.src(paths.specs)
    .pipe(coffee())
    .pipe(concat('specs.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('assemble:specs', function(){
  gulp.src(paths.spec_requirements)
    .pipe(concat('specs-run.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('run:specs', function(){
  gulp.src('lib/specs-run.js')
    .pipe(shell('./blinky_specs'));
});

gulp.task('test:specs', function(){
  gulp.src('lib/specs-run.js')
    .pipe(shell('./jenkins_specs'));
});

gulp.task('default', function(){
  gulp.run('scripts');
  gulp.run('templates');
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.scripts.concat(paths.specs).concat(paths.templates), ['compile:specs']);
  gulp.watch(paths.spec_requirements.concat(['lib/spec_helper.js']), ['assemble:specs']);
  gulp.watch(['src/init.coffee'], ['scripts:init']);
  gulp.watch('lib/specs-run.js', ['run:specs']);
  gulp.watch(['lib/**/*.js'], ['package']);
  return
});
