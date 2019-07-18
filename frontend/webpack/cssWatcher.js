const ExtractTextPlugin = require("extract-text-webpack-plugin");
const output = require('./const/output');
module.exports = function () {
    return {
        module: {
            rules:
                [
                    {
                        test: /\.css$/,
                        include: output,
                        use: ExtractTextPlugin.extract({
                            use: [
                                {loader: "style-loader"},
                                {
                                    loader: "css-loader",
                                    options: {
                                        minimize: true,
                                        sourceMap: false
                                    }
                                }
                            ]
                        })
                    }
                ]
        }
    };
};
