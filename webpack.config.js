// const webpack = require('webpack'); // Webpack vient avec plusieur plugins d'emblé
const path = require('path'); //path fait parti de node.js
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development', //production

    entry: {
        main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
        presentation: path.resolve(__dirname, 'src/assets/scripts/presentation.js'),
        pageconstruction: path.resolve(__dirname, 'src/assets/scripts/pageconstruction.js'),
      },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js', // plus tard on va le séparer en production et developpement et ajouter [name]-[contenthash].bundle.js
        // assetModuleFilename: '[name][ext]', // Pour les fichiers images et autres
        // publicPath: '/dist', //-vérifier l'utilité...
        clean: true,
    },

    devtool: 'inline-source-map', //permet d'identifier l'orgine des erreurs

    devServer: {
        // static: path.resolve(__dirname, 'dist'), vérifier l'utilité semble en lien avec les fichier statique comme les images (les assets).
        // port: 5001,
        // open: true, - djà mis dans les options au lancement du script: ouvre le navigateur par défaut
        hot: true, //Afficher les changements live au modification des fichiers
    },

    module: {  //Ce sont les loaders
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'], //permet de transformer le javascript en ES5
                    },
                  },
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',
            // },
            // { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' }, //Webpack5 fournit par défaut mais doivent être utilise
            //css
            // { 
            //     test: /\.css$/, 
            //     use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            // },
            // { 
            //     test: /\.css$/, 
            //     use: ['style-loader', 'css-loader'] //Utiliser style-loader écrit le css dans la page html directement;
            // },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'], //Se lit de droite à gauche - sass-loader transforme le sass en css;
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({   // Peut être un fichier.js
            title: 'Présentation',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            headTags: `<link rel="stylesheet" href="reveal/reset.css">
                        <link rel="stylesheet" href="reveal/reveal.css">
                        <link rel="stylesheet" href="reveal/theme/black.css">
                        <link rel="stylesheet" href="reveal/plugin/highlight/monokai.css">`,
            bodyTags:`<script src="./reveal/reveal.js"></script>
                        <script src="./reveal/plugin/notes/notes.js"></script>
                        <script src="./reveal/plugin/markdown/markdown.js"></script>
                        <script src="./reveal/plugin/highlight/highlight.js"></script>
                        <script>Reveal.initialize({
                            controls: true,
                            progress: true,
                            center: true,
                            hash: true,
                            embedded: false,
                            plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
                        });</script>`,
            excludeChunks: [ 'pageconstruction' ] //permet de l'exclure de la page - par défaut il inclut tout
        }),
        new HtmlWebPackPlugin({
            title: 'Page en construction',
            filename: 'page-en-construction.html', 
            template: path.resolve(__dirname, 'src/page-en-construction.html'), 
            chunks: [ 'main', 'pageconstruction' ]
        }), 
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: '[name].css'
         }),
         new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'node_modules/reveal.js/dist'), to: path.resolve(__dirname, 'dist/reveal') },
              { from: path.resolve(__dirname, 'node_modules/reveal.js/plugin'), to: path.resolve(__dirname, 'dist/reveal/plugin') },
              { from: path.resolve(__dirname, 'src/assets/images'), to: path.resolve(__dirname, 'dist/assets/images') },
            ],
          }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        // }),
    ],
    
};