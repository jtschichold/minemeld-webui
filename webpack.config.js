const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const argv = require('yargs').argv

const baseConfig = require('./webpack.config.base');

const BUILD_CONFIG = require('./env/conf.build');
const BUILD_TARGET = process.env.NODE_ENV === 'dist' ? 'dist' : 'build';

const makeSRC = (list) => list.map((file) => path.resolve(file));

module.exports = [
        // app
        {
        ...baseConfig,
        entry: {
            app: [
                './app/index.module.ts',
                ...BUILD_CONFIG.nodeControllers,
                ...BUILD_CONFIG.app_files.js
            ]
        },

        externals: {
            angular: 'angular'
        },

        resolve: {
            ...baseConfig.resolve,
            alias: {
                sass: path.resolve(__dirname, 'src/sass')
            }
        },

        plugins: [
            ...baseConfig.plugins,
            new CopyWebpackPlugin(
                [
                    {
                        from: './assets/**/*',
                        to: path.resolve(`${BUILD_TARGET}`)
                    },
                    { 
                        from: './favicon.ico',
                        to: path.resolve(`${BUILD_TARGET}`)
                    }
                ],
                {
                    copyUnmodified: true,
                    debug: 'info'
                }
            ),
        
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                exclude: ['templates', 'html', 'styles']
            }),
        
            new OptimizeCssAssetsPlugin(),

            new MiniCssExtractPlugin({
                filename: 'styles/[name].css'
            })
        ],

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 3000,
            proxy: [{
                context: [
                    '/login', '/logout', '/status', '/metrics',
                    '/prototype', '/config', '/supervisor', '/feeds',
                    '/validate', '/traced', '/aaa', '/logs', '/extensions',
                    '/jobs'
                ],
                target: argv.url,
                secure: false
            }]
        }
    },
    {
        ...baseConfig,
        entry: {
            vendor: [
                '../webpack/vendor.globals.js'
            ]
        },
        plugins: [
            ...baseConfig.plugins,
    
            new CopyWebpackPlugin(
                [
                    ...BUILD_CONFIG.vendor_files.fonts.map(s => {
                        return {
                            from: path.resolve(s),
                            to: path.resolve(`${BUILD_TARGET}`, 'assets/fonts/[name].[ext]'),
                            toType: 'template'
                        };
                    })
                ],
                {
                    copyUnmodified: true,
                    debug: 'info'
                }
            )
        ]
    }
];
