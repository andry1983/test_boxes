const output = require('./const/output');
const entry = require('./const/entry');
const template = require('./const/template');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const coren = path.resolve(__dirname, '../../', '.env');
const env_project = require('dotenv').config({path: coren});
let {error = null, parsed = null} = env_project;
if (error) {
    throw error;
}

if (parsed) {
    for (let key in parsed) {
        parsed[key] = JSON.stringify(parsed[key])
    }
}
module.exports = function (env) {
    const isProd = env === 'production';
    const plugins = [
            new webpack.optimize.CommonsChunkPlugin(
                {
                    name: 'common',
                    minChunks: function (module) {
                        return module.context && module.context.includes('node_modules');
                    }
                }
            ),
            new HtmlWebpackPlugin({
                title: 'bundle',
                // template: path.join(template, 'index.html'),
                path: output,
                chunks: 'common',
                production: isProd,
                inject: true,
                minify: isProd && {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Front',
                template: path.join(template, 'index.html'),
                filename: 'index.html',
                path: output,
                chunks: 'front',
                production: isProd,
                inject: true,
                minify: isProd && {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                // defaultAttribute: 'async',
                preload: {
                    test: /^0|^main|^style-.*$/,
                    chunks: 'all',
                },
            })
        ]
    ;
    if (isProd) {
        process.env.NODE_ENV = 'production';
        process.env.BABEL_ENV = 'production';
        let obj = Object.assign({
            NODE_ENV: JSON.stringify('production'),
            BABEL_ENV: JSON.stringify('production')
        }, parsed);
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': obj
            }),
            new ExtractTextPlugin({
                filename: 'static/css/[name].css',
                allChunks: true,
            }),
            // new StyleExtHtmlWebpackPlugin({
            //     chunks: ['admin', 'front'],
            //     // cssRegExp: appCriticalCssLoader.test,
            //     minify: true,
            //     // position: 'head-top',
            // }),
            new UglifyJSPlugin({
                source_map: false,
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
            })
        )
        ;
    } else {
        let obj = Object.assign({
            NODE_ENV: JSON.stringify('development'),
            BABEL_ENV: JSON.stringify('development')
        }, parsed);
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': obj
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin()
        );
    }
    return {
        plugins: plugins
    }
};
