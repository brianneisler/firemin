const sourceMapSupport = require('source-map-support')

sourceMapSupport.install()
module.exports = require('./dist')
