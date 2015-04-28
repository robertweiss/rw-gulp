// Plugins initieren
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'browser-sync', 'yargs', 'request-json', 'node-notifier']
    });
    plugins.browserSync = plugins.browserSync.create();

// Projektbezogene Variablen definieren
var gulpDir = './gulptasks/',
    config = require(gulpDir+'config')();

// Tasks aus Dateien laden
function getTask(task) { return require(gulpDir+task)(gulp, plugins, config); }

gulp.task('sass', getTask('sass'));
gulp.task('js', getTask('app'));
gulp.task('svg', getTask('svg'));
gulp.task('img', getTask('img'));
gulp.task('watch', getTask('watch'));
gulp.task('default', ['watch']);
