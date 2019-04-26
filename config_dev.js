const fiber = require('fibers')
const sass = require('sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')()
const withTM = require('next-transpile-modules')
const {BUNDLE_ANALYZE} = process.env
const bundleAnalyzerConfig = {
  analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}

const sassConfig = {
  sassLoaderOptions: {
    fiber: fiber,
    implementation: sass,
    // includePaths: ['node_modules', glob.sync('packages/*/node_modules').map((d) => path.join(__dirname, d))]
    includePaths: ['node_modules']
  }
}

module.exports = function (env = {}, plugins = []) {
  const config = require('./nextjs_config')(env)

  let pluginConfiguration = [
    [withBundleAnalyzer, bundleAnalyzerConfig],
    // @zeit/next-sass
    [withSass, sassConfig],
    // next-offline
    // [withOffline],
    [withSourceMaps],
    [withTM]
  ]

  if (plugins.length) {
    plugins.forEach(plugin => {
      if (!Array.isArray(plugin)) {
        throw new Error('plugin configuration must be wrapped in an array.')
      }
      pluginConfiguration.unshift(plugin)
    })
  }
  return withPlugins(pluginConfiguration, config
  )
}
