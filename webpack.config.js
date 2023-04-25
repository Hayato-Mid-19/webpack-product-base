const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const WebpackRemoveEmptyScript = require('webpack-remove-empty-scripts')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        top: [
            './src/assets/js/top.ts',
            './src/assets/scss/top.scss',
        ],
        index: [
            './src/assets/js/index.ts',
            './src/assets/scss/index.scss',
            './src/assets/scss/top.scss',
        ],
    },
    output: {
        filename: 'assets/js/[name].js',
        chunkFilename: '[id].css',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.ejs$/,
                use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            esModule: false,
                        }
                    },
                    {
                        loader: 'template-ejs-loader',
                        options: {
                            includePath: [path.resolve(__dirname, './src/_ejs')]
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: (url, resourcePath, context) => {
                            const basePath = 'assets/images/';
                            const folderPath = url.match(/^(\w+)_/)[1];
                            return `${basePath}${folderPath}/${url}`;
                        },
                        esModule: true,
                    },
                }, ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),
        new WebpackWatchedGlobEntries(),
        new WebpackRemoveEmptyScript(),

        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            chunks: ['top'],
        }),
        new HtmlWebpackPlugin({
            template: './src/another.ejs',
            filename: 'another.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/sub/index.ejs',
            filename: 'sub/index.html',
            // chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/sub2/index.ejs',
            filename: 'sub2/index.html',
            // chunks: ['index'],
        }),
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080,
        open: true,
        hot: true,
        watchFiles: ['src/**']
    },
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js',
        ],
    },
};
