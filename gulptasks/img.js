// Img-Task mit imgMin
module.exports = function (gulp, plugins, config) {
    return function(){
        gulp.src(config.files.img)
        .pipe(plugins.plumber({errorHandler: config.error.imgError}))
        .pipe(plugins.debug({title: 'Images:'}))
        .pipe(plugins.changed(config.paths.img))
        .pipe(plugins.imageoptim.optimize())
        .pipe(plugins.size({showFiles:true}))
        .pipe(gulp.dest(config.paths.img));
    };
};
