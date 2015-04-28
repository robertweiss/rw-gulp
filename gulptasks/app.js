// JS-Task mit Concat und Uglify
module.exports = function (gulp, plugins, config) {
    return function(){
        gulp.src(config.files.js)
        .pipe(plugins.plumber({errorHandler: config.error.jsError}))
        .pipe(plugins.if(plugins.yargs.argv.prod, plugins.debug({title: 'JS (Production):'})))
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.debug({title: 'JS:'})))
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.init()))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.if(plugins.yargs.argv.prod, plugins.uglify()))
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.write('.')))
        .pipe(plugins.size({showFiles:true}))
        .pipe(gulp.dest(config.paths.js));
    };
};