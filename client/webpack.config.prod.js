const path = require('path');
const pathOut = path.resolve(__dirname, "static")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: pathOut,
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: 'src/index.html'
        }
    )],
    devServer: {
        host: '127.0.0.1',
        static: pathOut,
        compress: true,
        hot: true,
        port: 9000,
        open: true
    }
}