module.exports = {
  entry: "./client/src/client.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "client.js",
    path: __dirname + "/dist/client"
  },
  node: {
    fs: "empty"
  }
};
