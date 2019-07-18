const entry = require('./const/entry');
const path = require('path');
module.exports = function () {
    return {
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,         // Match both .js and .jsx files
                    exclude: [/node_modules/],
                    include: entry,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ],

                },
            ]
        },
    };
};
