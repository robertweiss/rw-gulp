// SVG-Task mit SVGMin
module.exports = function (gulp, plugins, config) {
    return function(){
        gulp.src(config.files.svg)
        .pipe(plugins.plumber({errorHandler: config.error.svgError}))
        .pipe(plugins.debug({title: 'SVG:'}))
        .pipe(plugins.svgSprite(config.svgSprites))
        .pipe(plugins.size({showFiles:true}))
        .pipe(gulp.dest(config.paths.svg));
    };
};