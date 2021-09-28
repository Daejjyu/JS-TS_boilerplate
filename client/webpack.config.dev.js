const path = require('path');
const pathOut = path.resolve(__dirname, "static")

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: 'inline-source-map', //source map for debug, avoid using in production
    output: {
        path: pathOut,
        filename: "bundle.js",
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src/"),
            "@core": path.resolve(__dirname, "src/core/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@img": path.resolve(__dirname, "src/img/"),
            "@svg": path.resolve(__dirname, "src/svg/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html'
            }
        ),
        new Dotenv(),
    ],
    devServer: {
        host: '127.0.0.1',
        static: pathOut,
        compress: true,
        hot: true,
        port: 9000,
        open: true
    }
}