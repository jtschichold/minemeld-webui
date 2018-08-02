module.exports = [
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
            { loader: 'babel-loader' },
            { loader: 'awesome-typescript-loader' }
        ]
    }
];
