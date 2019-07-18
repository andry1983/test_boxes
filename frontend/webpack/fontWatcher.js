const  fontPath= require('./const/fontsPath');
module.exports = function(){
    return {
        module: {
            rules:
                [
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        // include:fontPath,
                        loader:'file-loader',
                        options:{
                            name: 'static/fonts/[name].[ext]'
                        }
                    }
                ]
        }
    };
};
