const dotenv = require('dotenv')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const {EnvironmentPlugin} = require('webpack');

dotenv.config();

module.exports = function override(config) {
    config.plugins.push(
        new NodePolyfillPlugin(),
    );
    config.plugins.push(new EnvironmentPlugin(['AUTH_REDIRECT_URI', 'AUTH_CLIENT_ID', 'APP_ID']),)
    config.resolve =
        {
            extensions: ['.ts', '.js', '.jsx', '.tsx'],
            modules: ['src', 'node_modules'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                buffer: require.resolve('buffer'),
            },
        };
    return config;
};
