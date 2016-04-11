// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
var testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
var clientContext = require.context('../../client', true, /^\.\/(?!main(\.js)?$)/)
clientContext.keys().forEach(clientContext)


//var serverContext = require.context('../../server', true, /^\.\/(?!main(\.js)?$)/)
//serverContext.keys().forEach(serverContext)
