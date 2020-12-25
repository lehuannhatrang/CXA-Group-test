const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, './build'),
    SRC: path.resolve(__dirname, './src'),
    PUB: path.resolve(__dirname, './public'),
};

// Webpack configuration
module.exports = (env) => {
    const config = {
        entry: [
            '@babel/polyfill',
            path.join(paths.SRC, 'index.js'),
        ],
        output: {
            path: paths.DIST,
            filename: 'app.bundle.[hash].js',
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            "plugins": [
                                "@babel/plugin-proposal-class-properties"
                            ],
                            cacheDirectory: true,
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader','css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            // Interprets CSS
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         ident: 'postcss',
          
                        //         plugins: () => [
                        //                 postcssPresetEnv({
                        //                     browsers: ['>1%']
                        //                 }),
                        //                 require('cssnano')()
                        //             ]
                        //     }
                        // },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: '/fonts/[name].[hash].[ext]'
                    }
                }
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".es6", ".json"],
        },
        // Dev server configuration -> ADDED IN THIS STEP
        // Now it uses our "src" folder as a starting point
        devServer: {
            contentBase: paths.SRC,
            historyApiFallback: true,
            compress: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(paths.PUB, 'index.html'),
                filename: './index.html',
                favicon: path.join(paths.PUB, 'favicon.ico')
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {from: path.join(paths.PUB, 'assets/imgs'), to: 'assets/imgs'},
                    {from: path.join(paths.PUB, 'style.css'), to: 'style.css'},
                ],
            }),
            new WebpackAssetsManifest(),
            new MiniCssExtractPlugin({
                filename: 'style.bundle.css'
            })
        ],
    }
    if (env === 'prod') {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"production"`
            }
        }))
    } 
    return config;
};
