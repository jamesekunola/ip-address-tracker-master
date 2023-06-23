const webpack = require("webpack");
const HtmlWebpackPlugins = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.export = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
  },
  devtool: "source-maps",
  module: {
    rules: [{ text: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }],
    rules: [
      {
        text: /\.png$/,
        use: [{ loader: "url-loader", option: { mimetype: "image/png" } }],
      },
    ],
    rules: [
      {
        text: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
    ],
    rules: [
      {
        text: /\.s(a|c)ss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devSever: {
    contentBase: "src",
    hot: "true",
    open: "true",
    port: 8000,
    watchContentBase: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugins({
      template: "src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new Dotenv(),
  ],
};
