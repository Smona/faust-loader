const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
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
