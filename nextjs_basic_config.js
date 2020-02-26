const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['@lumen/mwc'])
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function (env = {}, plugins = []) {
  const config = {
    target: 'serverless',
    experimental: {
      modern: true,
      polyfillsOptimization: true,
      async rewrites () {
        return [
          {source: '/sitemap.xml', destination: '/api/sitemap'},
          {source: '/', destination: '/[...index]'}
        ]
      }
    },
    // compress: false,
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
