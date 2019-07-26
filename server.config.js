module.exports = {
  entry: "./server/src/server.ts",
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
    filename: "server.js",
    path: __dirname + "/dist/server"
  },
  node: {
    fs: "empty"
  }
};
