const fiber = require('fibers')
const sass = require('sass')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')

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
  const pluginConfiguration = [
    [withSass, sassConfig],
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
  return withPlugins(pluginConfiguration,
    config
  )
}
