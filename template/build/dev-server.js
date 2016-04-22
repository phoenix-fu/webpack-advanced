var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var proxyMiddleware = require('http-proxy-middleware')
var dev_server_local = require('./dev-server-local')

var app = express()
var compiler = webpack(config)

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = {
  '/api': 'http://localhost:9999',
  '/site': 'http://localhost:9999',
  '/wechat': 'http://localhost:9999',
  '/uploads': 'http://localhost:9999'
}
for (var attr in dev_server_local.proxyTable) { proxyTable[attr] = dev_server_local.proxyTable[attr]; }

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/static', express.static('./static'))


module.exports = app.listen(dev_server_local.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:'+dev_server_local.port)
})
