const imgPath = require('./const/imgPath');
module.exports = function () {
    return {
        module: {
            rules:
                [
                    {
                        test: /\.(jpe?g|png|svg|ico|gif)$/,
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            emitFile: true,
                            name: 'static/img/[name].[ext]',
                        }
                    }
                ]
        }
    };
};
