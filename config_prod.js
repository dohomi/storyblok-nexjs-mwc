const withPlugins = require('next-compose-plugins')

module.exports = function (env = {}, pathAliasOverwrites = {}, plugins = []) {
  const config = require('./nextjs_config')(env, pathAliasOverwrites)
  const pluginConfiguration = []
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
