const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const CnameWebpackPlugin = require('cname-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    bail: true,
    output: {
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[name].chunk.js',
        // publicPath: '/'
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css'
        }),
        new CnameWebpackPlugin({
            domain: 'ramceconcepcion.tk',
        }),
    ],
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.s?css/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }
        ]
    }
});