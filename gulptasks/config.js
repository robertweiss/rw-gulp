module.exports = function () {
    var config = {};
    var baseDir = '../';

    config.url = require('../package.json').homepage || 'localhost';

    config.error = require('./error')();

    config.paths = {
        static: baseDir,
        sass: 'assets/sass/',
        css: 'assets/css/',
        svg: 'assets/svg/',
        img: 'assets/img/',
        js: 'assets/js/'
    };

    config.files = {
        static: '**/*.{php,htm,html}',
        sass: config.paths.sass+'**/*.scss',
        svg: config.paths.svg+'sprites/*.svg',
        img: config.paths.img+'src/*.{jpg,jpeg,png}',
        js: require(config.paths.static+config.paths.js+'plugins.json').plugins
    };

    config.unCss = {
        ignore: [/clearing/]
    };

    config.svgSprites = {
        shape: {
            id: {
                generator: "icon-%s"
            },
            dimension: {
                maxWidth: 64,
                maxHeight: 64,
                precision: 1
            }
        },
        transform: [
            {svgo: {plugins: [{cleanupIDs: false}]}}
        ],
        svg: {
            xmlDeclaration: '',
            doctypeDeclaration: '',
            namespaceIDs: false
        },
        mode: {
            symbol: {
                dest: '.',
                bust: false,
                inline: true,
                sprite: 'sprites.svg',
                prefix: ".icon__%s",
                dimensions: "%s",
                render: {
                    scss: {
                        dest: '../sass/common/_icons.scss',
                        template: config.paths.svg+'tpl/sprites.scss'
                    }
                },
                example: {
                    dest: 'sprites.html',
                    template: config.paths.svg+'tpl/sprites.html'
                }
            }
        }
    };

    return config;
};
