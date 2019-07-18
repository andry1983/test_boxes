const entry = require('./const/entry');
const path = require('path');
const template = require('./const/template');

module.exports = function () {
    const {PORT, HOST, ENV} = process.env;
    const isProd = ENV === 'production';
    let port = isProd ? PORT : (+PORT + 1);

    return {
        devServer: {
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                },
            },
            contentBase: entry,
            port: port || 3033,
            historyApiFallback: true,
            inline: true,
            hot: true,
            host: HOST || '127.0.0.1'
        }
    }
};
