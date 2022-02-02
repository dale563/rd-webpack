const path = require('path');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: {
        main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
        presentation: path.resolve(__dirname, 'src/assets/scripts/presentation.js'),
        pageconstruction: path.resolve(__dirname, 'src/assets/scripts/pageconstruction.js'),
      },
      
    output: {
        path: path.resolve(__dirname, 'public'),
        assetModuleFilename: 'assets/[name][ext]',
        clean: true,
    },

    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            excludeChunks: [ 'pageconstruction' ]
        }),
        new HtmlWebPackPlugin({
            filename: 'page-en-construction.html', 
            template: path.resolve(__dirname, 'src/page-en-construction.html'), 
            chunks: [ 'main', 'pageconstruction' ]
        }), 
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    },
                  },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                } 
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/, 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                } 
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
            },
        ]
    },
};