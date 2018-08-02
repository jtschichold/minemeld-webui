module.exports = [
    {
        test: /\.tpl.html$/,
        use: [
            { 
                loader: 'html-loader',
                options: {
                    minimize: process.env.NODE_ENV === 'dist',

                    // disable attribute processing for templates
                    attrs: false
                }
            }
        ]
    }
];
