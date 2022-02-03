const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/assets/scripts/main.js"),
    presentation: path.resolve(__dirname, "src/assets/scripts/presentation.js"),
    pageconstruction: path.resolve(
      __dirname,
      "src/assets/scripts/pageconstruction.js"
    ),
  },

  output: {
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      excludeChunks: ["pageconstruction"],
    }),
    new HtmlWebPackPlugin({
      filename: "page-en-construction.html",
      template: path.resolve(__dirname, "src/page-en-construction.html"),
      chunks: ["main", "pageconstruction"],
    }),
    new PurgeCSSPlugin({
      // paths: glob.sync(path.join(__dirname, "src/**/*"),  { nodir: true }),
      paths: glob.sync(path.join(__dirname, "src/**/*.*")), // Consider extracting as a parameter
      only: ["main"],
      //   extractors: [
      //     {
      //       extractor: (content) =>
      //         content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      //       extensions: ["html"],
      //     },
      //   ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
        use: {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              //   quality:20,
              progressive: true,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 7,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            // webp: {
            //   quality: 75,
            // },
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: [require("autoprefixer")()] },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
