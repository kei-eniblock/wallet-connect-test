const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
    config.plugins.push(
        new NodePolyfillPlugin(),
    );
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
