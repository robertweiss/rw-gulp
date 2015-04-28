module.exports = function (gulp, plugins, config) {

    if(!plugins.yargs.argv.prod) {
        // Sass-Task für Dev mit Autoprefixer und Sourcemaps
        return function(){
            gulp.src(config.files.sass)
            .pipe(plugins.plumber({errorHandler: config.error.sassError}))
            .pipe(plugins.debug({title: 'SASS:'}))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(plugins.size({showFiles:true}))
            .pipe(gulp.dest(config.paths.css))
            .pipe(plugins.filter('**/*.css'))
            .pipe(plugins.browserSync.reload({stream: true}));
        };

    } else {
        // Sass-Task für Prod mit Autoprefixer und UnCss, ohne Sourcemaps
        return function(){
            plugins.requestJson.createClient(config.url).get('/sitemap.json', function(err, res, body) {
               if (err) {
                    console.log('Sitemap für UnCSS nicht gefunden:');
                    console.log(err);
                    return false;
                }
                gulp.src(config.files.sass)
                .pipe(plugins.plumber({errorHandler: config.error.sassError}))
                .pipe(plugins.debug({title: 'SASS (Production):'}))
                .pipe(plugins.sass())
                .pipe(plugins.uncss({
                    html: body.urls,
                    ignore: config.unCss.ignore
                }))
                .pipe(plugins.autoprefixer())
                .pipe(plugins.minifyCss())
                .pipe(plugins.size({showFiles:true}))
                .pipe(gulp.dest(config.paths.css));
            });
        };
    }
};