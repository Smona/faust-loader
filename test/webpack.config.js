const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "index.ts"),
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
        exclude: /node_modules/,
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
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
