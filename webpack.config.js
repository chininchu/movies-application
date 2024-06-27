const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    movies: "./public/js/movies.js",
    watchlist: "./public/js/watchlist.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["movies"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/watchlist.html",
      chunks: ["watchlist"],
      filename: "watchlist.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],
  },
};
