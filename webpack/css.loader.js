const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: process.env.NODE_ENV === 'dist'
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    // includePaths: [path.resolve('./src/sass')]
                }
            }
        ]
    }
];
