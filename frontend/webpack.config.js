const entry = require('./webpack/const/entry');
const output = require('./webpack/const/output');
const merge = require('webpack-merge');
const jsWatcher = require('./webpack/jsWatcher');
const cssWatcher = require('./webpack/cssWatcher');
const scssWatcher = require('./webpack/scssWatcher');
const devServer = require('./webpack/devServer');
const imagesWatcher = require('./webpack/imagesWatcher');
const fontWatcher = require('./webpack/fontWatcher');
const Plugins = require('./webpack/Plugins');
const path = require('path');
const common = merge([
    {
        context: __dirname,
        devtool: 'source-map',
        entry: {
            front: ['regenerator-runtime/runtime', path.resolve(entry, 'apps', 'boxes', 'index.js')],

        },
        output: {
            jsonpFunction: 'webpackJsonp',
            path: output,
            publicPath: '/',
            filename: 'static/js/[name].js'
        },
    },
    jsWatcher(),
    imagesWatcher(),
    fontWatcher(),
]);


module.exports = function (env) {
    let {ENV} = process.env;
    ENV = env || ENV;
    if (ENV === 'development') {
        return merge(
            [
                common,
                scssWatcher(ENV),
                Plugins(ENV),
                devServer()
            ]
        );
    }
    if (ENV === 'production') {
        return merge(
            [
                common,
                scssWatcher(ENV),
                // cssWatcher(),
                Plugins(ENV),
            ]);
    }
};
