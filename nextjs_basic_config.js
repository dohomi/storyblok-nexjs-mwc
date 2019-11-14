const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
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

module.exports = function (env = {}, plugins = []) {
  const config = {
    target: 'serverless',
    compress: false,
    transpileModules: ['@lumen/mwc'],
    env,
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.resolve.plugins.push(new TsconfigPathsPlugin())

      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (entries['main.js']) {
          entries['main.js'].unshift('@polyfills')
        }
        return entries
      }
      return config
    }
  }


  let pluginConfiguration = [
    [withBundleAnalyzer, bundleAnalyzerConfig],
    // next-offline
    // [withOffline],
    // [withSourceMaps],
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
  return withPlugins(pluginConfiguration, config)
}
