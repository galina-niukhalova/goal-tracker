module.exports = {
    entry: [
      './js/controller.js'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: './js/index.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
    }
  };