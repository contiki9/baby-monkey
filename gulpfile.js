'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var browser_sync = require('browser-sync');
var autoprefixer = require('autoprefixer');
var rimraf       = require('rimraf');
var runSequence  = require('run-sequence');
var zip          = require('gulp-zip');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');

var dir = {
    src: {
        css     : 'src/css',
        js      : 'src/js',
        img     : 'src/img',
        packages: 'node_modules'
    },
    dist: {
        css     : 'assets/css',
        js      : 'assets/js',
        img     : 'assets/img',
        packages: 'assets/packages'
    }
}

/**
 * Remove directory for copied node modules
 */
gulp.task('remove-packages', function(cb) {
    rimraf(dir.dist.packages, cb);
});

/**
 * Copy dependencies node modules to src directory
 */
gulp.task('packages', ['remove-packages'], function(cb) {
    var packages = [
        dir.src.packages + '/font-awesome/**',
        dir.src.packages + '/slick-carousel/**',
        dir.src.packages + '/jquery.sticky/**',
        dir.src.packages + '/jquery.background-parallax-scroll/**',
        dir.src.packages + '/jquery.smoothscroll/**',
    ];
    return gulp.src(packages, {base: 'node_modules'})
        .pipe(gulp.dest(dir.dist.packages));
});

/**
 * Remove images in assets directory
 */
gulp.task('remove-images', function(cb) {
    rimraf(dir.dist.img, cb);
});

/**
 * Copy images to assets directory
 */
gulp.task('img', ['remove-images'], function() {
    return gulp.src(dir.src.img + '/**/*')
        .pipe(gulp.dest(dir.dist.img));
});

/**
 * Build CSS
 */
gulp.task('css', ['remove-css'], function() {
    return sassCompile(dir.src.css + '/*.scss', dir.dist.css)
        .on('end', function() {
            return gulp.src(dir.src.css + '/**/*.php')
                .pipe(gulp.dest(dir.dist.css));
        });
});

/**
 * Remove directory for copied node modules
 */
gulp.task('remove-css', function(cb) {
    rimraf(dir.dist.css, cb);
});

function sassCompile(src, dest) {
    return gulp.src(src)
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        ]))
        .pipe(gulp.dest(dest))
        .pipe(postcss([
            cssnano({
                'zindex': false
            })
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest))
}

/**
 * Build
 */
gulp.task('build', ['packages', 'img','uglify'], function() {
    return runSequence('css');
});

/**
 * browsersync
 */
gulp.task('browsersync', function() {
    browser_sync.init({
        //proxy: 'http://hoge.local/',
        files: [
            '**/*.php',
            dir.dist.css + '/style.min.css'
        ],
    });
});

//js
gulp.task('uglify', function(cb) {
    return gulp.src( dir.src.js + '/*.js' )
        .pipe( uglify({
            output:{
                comments: /^!/
            }
        }))
        .pipe( rename({
            extname: '.min.js'
        }) )
        .pipe( gulp.dest( dir.dist.js ) );
});

/**
 * Creates the zip file
 * This command must be build beforehand on Travis CI !!
 */
gulp.task('zip', function(){
    return gulp.src(
        [
            '**',
            '!node_modules',
            '!node_modules/**',
            '!package.json',
            '!gulpfile.js',
            '!yarn.lock',
        ],
        {base: './'}
    )
        .pipe(zip('snow-monkey.zip'))
        .pipe(gulp.dest('./'));
});

/**
 * Auto build and browsersync
 */
gulp.task('default', ['build'], function() {
    gulp.watch([dir.src.css + '/**/*.scss'], ['css']);
    gulp.watch([dir.src.js + '/**/*.js'] , ['uglify']);
    gulp.watch([dir.src.img + '/**'] , ['img']);
});