if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')(require('./babel.config'))
  module.exports = require('./src')
} else {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
  module.exports = require('./dist')
}
