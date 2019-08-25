const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../src/scripts/app.js')
    },
    output: {
        path: Path.join(__dirname, '../docs'),
        filename: 'scripts/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false
        }
    },
    plugins: [
        new CleanWebpackPlugin(),

        //Folders
        new CopyWebpackPlugin([{
            from: Path.resolve(__dirname, '../src/files'),
            to: 'files'
        }]),
        new CopyWebpackPlugin([{
            from: Path.resolve(__dirname, '../src/resources'),
            to: 'resources'
        }]),
        new CopyWebpackPlugin([{
            from: Path.resolve(__dirname, '../src/scripts'),
            to: 'scripts'
        }]),

        //SEO
        new CopyWebpackPlugin([{
            from: Path.resolve(__dirname, '../src/googleb64fcb9a8d463f38.html'),
            to: "googleb64fcb9a8d463f38.html",
        }]),

        //Pages
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/index.hbs'),
            minify: false
        }),


        // new HtmlWebpackPlugin({
        //     title: 'Login',
        //     filename: "login.html",
        //     template: Path.resolve(__dirname, '../src/views/pages/auth/login.hbs'),
        //     minify: false
        // }),
    ],
    resolve: {
        alias: {
            '~': Path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [{
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
        },
        {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    publicPath: '/',
                    context: "src"
                }
            }
        },
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }
        ]
    }
};