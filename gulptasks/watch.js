// Watch-Task mit Browser-Sync
module.exports = function (gulp, plugins, config) {
    return function(){
        plugins.browserSync.init({
            notify: false,
            open: false,
            proxy: config.url
            /*server: {
                baseDir: "./",
                index: "index.htm"
            }*/
        });

        gulp.watch(config.files.sass, ['sass']);
        gulp.watch(config.files.img, ['img']);
        gulp.watch([config.files.js, config.paths.js+'plugins.json'], ['js']);

        var watchFiles = [
            config.files.static,
            config.paths.js+'*.min.js'
        ];
        gulp.watch(watchFiles).on('change', plugins.browserSync.reload);
    };
};