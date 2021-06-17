const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "my-first-webpack.bundle.js",
  },
  devServer: {
    contentBase: "test",
  },
  resolve: {
    alias: {
      "faust-loader": ".",
    },
  },
  module: {
    rules: [
      {
        test: /\.dsp$/,
        use: [
          {
            loader: path.resolve("./dist/faustLoader.js"),
            options: {
              outputPath: "./processors",
              publicPath: "/build/processors",
            },
          },
        ],
      },
    ],
  },
};
