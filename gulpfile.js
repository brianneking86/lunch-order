/*eslint-disable */
var fs = require('fs'),
    es = require('event-stream'),
    gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    shell = require('gulp-shell'),
    gitinfo = require('gulp-gitinfo'),
    // webpack and webpack-dev-server
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

var yargs = require('yargs').argv;

function _buildNext(options, i, cb) {
    var config = require('./webpack.config.js')(options);
    compiler = webpack(config);
    compiler.run(function(err, stats) {
        if (err) {
            throw new gulpUtilPluginError("build:prod", err);
        }
        gulpUtil.log("[build:prod]", stats.toString({
            colors: true
        }));

        cb();
    });
}

function build(options, callback) {
    if (options.isDev) {
        var config = require('./webpack.config.js')(options);
        compiler = webpack(config);
        new WebpackDevServer(compiler, {
            stats: {
                colors: true
            },
            inline: true,
            hot: true
        }).listen(options.port, "0.0.0.0", function(err) {
            if (err) {
                throw new gulpUtil.PluginError("webpack:dev-server", err);
            }
            gulpUtil.log("[webpack-dev-server]", "http://0.0.0.0:" + options.port);
        });
    } else {
        _buildNext(options, 0, callback);
    }
}

gulp.task('build', ['clear'], function(cb) {
    var argv = require('yargs')
        .describe('D', 'Run dev server')
        .describe('ip', 'Specify your server\'s ip, default is localhost')
        .describe('port', 'Specify port, default is 8080 for prod and 4080 for dev')
        .help('h')
        .argv

    if (argv.h) {
        console.log(require('yargs').help());
    } else {
        var isDev = !!argv.D;
        // Set default IP/port if none provided
        var ip = argv.ip || 'localhost';
        var port = argv.port || (isDev ? '4080' : '8080');
        console.log('url: %s:%s; dev ? %s', ip, port, isDev);

        build({
            ip: ip,
            isDev: isDev,
            port: port
        }, cb);
    }
});

gulp.task('lint', function() {
  return gulp.src(['app/assets/javascripts/**/*.js', 'app/assets/javascripts/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("clear", shell.task([
    'rm -rfv build',
    'mkdir build'
]));

gulp.task("gitinfo", function() {
    return shell(['rm -f build/gitinfo.json'])
        .pipe(gitinfo())
        .pipe(es.stringify())
        .pipe(fs.createWriteStream('build/gitinfo.json'));
});