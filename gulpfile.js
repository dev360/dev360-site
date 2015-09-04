var autoprefixer = require('autoprefixer-core');
var babelify = require('babelify');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var path = require('path');
var postcss = require('gulp-postcss');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var $ = require('gulp-load-plugins')();
var _ = require('underscore');

const files = {
    bundle: 'app.js',
    bundle_min: 'app.min.js',
    entry: 'index.js',
    lib: 'lib.min.js',
    sass_entry: 'main.scss'
};


ROOT = '.'
PROJ_ROOT = ROOT + '/public'

const paths = {
    bundle: PROJ_ROOT + '/js/' + files.bundle,
    bundle_min: PROJ_ROOT + '/js/' + files.bundle_min,
    css: PROJ_ROOT + '/stylesheets',
    sass: ROOT + '/sass/**/*.scss',
    sass_entry: ROOT + '/sass/' + files.sass_entry,
    dist: PROJ_ROOT + '/js',
    html: ROOT + '/views',
    lib: ROOT + '/vendor',
    react: ROOT + '/app/**/*.jsx',
    root: ROOT + '/app',
    scripts: ROOT + '/app/**/*.js',
    styles: ROOT + '/sass/*.scss'
};

var dependencies = [
  'jquery.min.js',
  'pubsub.js',
  'chance.min.js',
  'lodash.min.js',
  'react-addons.js',
  'sketch.js'
]
dependencies = _.map(dependencies, function(x) { return paths.lib + '/' + x });

function not(path) {
    return '!' + path;
}

gulp.task('styles', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(notify({ message: 'styles task complete' }));
}); 

gulp.task('js:lib', function() {
  return gulp.src(dependencies)
    .pipe(concat(files.lib))
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({ message: 'js:lib task complete' }));
});

gulp.task('bundle', function() {
    var bundle = browserify({
            debug: true,
            extensions: ['.js', '.jsx'],
            entries: path.resolve(paths.root, files.entry)
        });

    return executeBundle(bundle);
});

gulp.task('js:app', function() {
    var bundle = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: path.resolve(paths.root, files.entry),
        cache: {},
        packageCache: {}
    });
    bundle = watchify(bundle, { poll: 100 });
    bundle.transform(babelify.configure({
    }));
    bundle.on('update', function(){
        console.log('starting rebundle..');
        executeBundle(bundle);
    });
    return executeBundle(bundle);
});

function executeBundle(bundle) {
    var start = Date.now();
    bundle
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source(files.bundle))
        .pipe(gulp.dest(paths.dist))
        .pipe($.notify(function() {
            console.log('bundle finished in ' + (Date.now() - start) + 'ms');
        }))
        .pipe($.filter(files.bundle));
}

gulp.task('clean', function() {
    gulp.src(path.resolve(paths.dist, '*'))
        .pipe($.clean({force: true}));
});

gulp.task('js:app:minify', function() {
    gulp.src(paths.bundle)
        .pipe($.uglify())
        .pipe(concat(files.bundle_min))
        .pipe(gulp.dest(paths.dist))
        .pipe($.size({
            showFiles: true,
            title: 'js:app:minify:'
        }));
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts, paths.react], ['js:app']);
  gulp.watch([paths.lib], ['js:lib']);
  gulp.watch([paths.sass], ['styles']);

  livereload.listen();
  dirs = [
      ROOT + '/**/*.py',
      PROJ_ROOT + '/js/**/*.js',
      PROJ_ROOT + '/stylesheets/**/*.css',
      ROOT + '/views/**/*.ejs',
    ]
  gulp.watch(dirs).on('change', livereload.changed);

});

gulp.task('dev',
    ['watch']
);

gulp.task('default', ['dev']);

