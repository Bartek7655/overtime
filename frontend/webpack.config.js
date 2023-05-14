const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    mode:"development",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ],
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    devServer: {
        static:{
            directory: path.resolve(__dirname, 'dist'),
        },
        historyApiFallback: true,
        open: true,
        hot: true,
        port: 3000
    },
    module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ]
          }
        },
        ]
      }
    ]
  }
}