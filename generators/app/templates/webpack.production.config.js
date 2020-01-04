const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: 'scripts.js'
    },
    plugins: [
        new ImageminPlugin({ test: 'assets/images/**' }),
    ],
    module: {
        rules: [
            // javascript
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // styles
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "../css/[name].css"
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // images
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "../images/[name].[ext]"
                    }
                }
            }
        ],
    }
};
