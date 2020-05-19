const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['lumen-cms-core'])
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = function (env = {}, plugins = []) {
  const config = {
    experimental: {
      modern: true,
      async rewrites () {
        return [
          // {source: '/sitemap.xml', destination: '/api/sitemap'}
        ]
      }
    },
    // reactStrictMode: true, // => not working currently
    env,
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.resolve = config.resolve || {}
      // config.resolve.modules = config.resolve.modules || []
      // config.resolve.modules.push(path.join(__dirname, 'node_modules'))
      // config.resolve.modules.push(path.join(__dirname, 'node_modules/lumen-cms-core'))
      // config.resolve.modules.push(path.join(__dirname, 'src'))
      // config.resolve.alias = {
      //   '@components': path.join(__dirname, 'src/components/ComponentRender.tsx')
      // }

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
