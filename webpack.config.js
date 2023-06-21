const dotenv = require('dotenv')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

dotenv.config();

module.exports = {
    plugins: [
        new NodePolyfillPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['src', 'node_modules'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};
