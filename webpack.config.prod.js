const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.commun');
const { merge } = require('webpack-merge');

module.exports = merge(common, {

    mode: 'production',

    plugins: [
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: 'assets/styles/[name]-[contenthash].css'
         })
    ],

    output: {
        filename: 'assets/scripts/[name]-[contenthash].bundle.js',
    },

});