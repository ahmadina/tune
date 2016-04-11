var path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    dev: {
        port: 4001,
        proxyTable: {}
    },
    server: {
        base_url: 'v1.0',
        port: process.env.PORT || 4000,
        root: (process.env.NODE_ENV === 'production') ? 'http://api.ahmadina.com/' : 'http://localhost:4000/'
    }
};
