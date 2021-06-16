const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.dsp$/,
        use: [
          {
            loader: path.resolve("./webpack-faust-loader.js"),
          },
        ],
      },
    ],
  },
};
