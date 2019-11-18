const config = require('./nextjs_basic_config.js')
const withBundleAnalyzer = require('@next/bundle-analyzer')

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
  plugins.unshift([withBundleAnalyzer, bundleAnalyzerConfig])
  return config(env, plugins)
}
