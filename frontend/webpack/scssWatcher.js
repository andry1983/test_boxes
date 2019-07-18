const entry = require('./const/entry');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = function (env) {
    const isDev = env === "development";
    const extractSass = new ExtractTextPlugin({
        filename: "static/css/[name].css",
        disable: isDev,
        // allChunks: true
    });
    return {
        module: {
            rules:
                [
                    {
                        test: /\.scss$/,
                        // include: entry,
                        use: !isDev
                            ?
                            extractSass.extract({
                                fallback: 'style-loader',
                                use:
                                    [
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                sourceMap: false,
                                                importLoaders: 1
                                            }
                                        },
                                        {
                                            loader: 'postcss-loader',
                                            options: {
                                                sourceMap: false,
                                                plugins: [
                                                    require('autoprefixer')({
                                                        browsers: ['ie >= 8', 'last 4 version'],
                                                        cascade: false
                                                    }),
                                                    require('cssnano')({preset: 'default'})
                                                ],
                                            }
                                        },
                                        {
                                            loader: 'sass-loader',
                                            options: {
                                                data: '$ENV: production;',
                                                sourceMap: false,
                                                includePaths: [
                                                    path.resolve(entry, "../node_modules/compass-mixins/*"),
                                                    path.resolve(entry, "../node_modules/compass-mixins/lib"),
                                                    path.resolve(entry, "../sass/susy_2"),
                                                    path.resolve(entry, "../sass/configuration"),
                                                    path.resolve(entry, "../sass/myMixins")
                                                ]
                                            }
                                        },
                                    ]
                            })
                            :
                            [
                                {
                                    loader: 'style-loader'
                                },
                                {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: true,
                                        importLoader: 1
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        data: '$ENV: development;',
                                        sourceMap: true,
                                        includePaths: [
                                            path.resolve(entry, "../node_modules/compass-mixins/*"),
                                            path.resolve(entry, "../node_modules/compass-mixins/lib"),
                                            path.resolve(entry, "../sass/susy_2"),
                                            path.resolve(entry, "../sass/fonts"),
                                            path.resolve(entry, "../sass/myMixins")
                                        ]
                                    }
                                }
                            ]
                    }
                ]
        },
        plugins: (!isDev) ? [extractSass] : []
    };
};
