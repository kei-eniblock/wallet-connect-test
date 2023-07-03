const dotenv = require('dotenv')
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

dotenv.config();

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new NodePolyfillPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js', 'tsx', 'jsx'],
        modules: ['src', 'node_modules'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
        },
    },
    devServer: {
        host: 'localtest.me',
        port: 8888,
        https: true
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js|tsx|ts)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
        ],
    }
};
