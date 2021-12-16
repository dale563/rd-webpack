const { merge } = require('webpack-merge');
const common = require('./webpack.config.commun');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {

    mode: 'development',

    output: {
        filename: 'assets/scripts/[name]-bundle.js',
    },

    plugins: [
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: 'assets/styles/[name].css'
         })
    ],

    devtool: 'inline-source-map',

    devServer: {
        open: true,
        hot: true,
    },

});