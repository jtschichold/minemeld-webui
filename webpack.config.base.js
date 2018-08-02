const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlMultibuildWebpackPlugin = require('./webpack/html-multibuild-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_TARGET = process.env.NODE_ENV === 'dist' ? 'dist' : 'build';
// const BUILD_TARGET = 'build';

let htmlMultibuildPlugin = new HtmlMultibuildWebpackPlugin({
    jsOrder: [
        'vendor.js',
        'app.js'
    ]
});

/**
 * Some plugins are broken -> uglifyJS
 * And don't catch their errors, we need to see them
 * tada !!
 */
process.on('unhandledRejection', (reason, p) => {
    console.log('Position', p);
    console.log('Reason', reason);
});

module.exports = {
    stats: 'minimal',
    context: path.resolve(__dirname, 'src'),
    devtool: process.env.NODE_ENV === 'dist' ? 'cheap-module-eval-source-map' : false, // Done via UglifyJS
    watchOptions: {
        ignored: [/node_modules/]
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.scss'],
        modules: [
            'node_modules'
        ],
        unsafeCache: true,
        symlinks: false,
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    output: {
        path: path.resolve(`./${BUILD_TARGET}`),
        filename: '[name].js'
    },
    module: {
        rules: [
            ...require('./webpack/ts.loader'),
            ...require('./webpack/tpl.loader'),
            ...require('./webpack/css.loader')
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: 'favicon.ico',
            inject: 'body',
            hash: true
        }),
        htmlMultibuildPlugin
    ]
};