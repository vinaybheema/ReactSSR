const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.dev.base');

const clientConfig = {
    target: 'node',
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    }
}

module.exports = merge(baseConfig, clientConfig);