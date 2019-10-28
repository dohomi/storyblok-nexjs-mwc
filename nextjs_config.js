const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

function nextjsConfigGen (env, pathAliasOverwrites = {}) {

  const defaults = {
    target: 'serverless',
    compress: false,
    transpileModules: ['@lumen/mwc'],
    env,
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }
      // const overwrites = {
      //   '@components': path.join(__dirname, 'components/ComponentRender.tsx'),
      //   '@routes': path.join(__dirname, 'server/routes.ts'),
      //   client: path.join(__dirname, 'client'),
      //   '@fonts': path.join(__dirname, 'components/fonts.ts'),
      //   '@initialData': path.join(__dirname, 'src/pages/utils'),
      //   ...pathAliasOverwrites
      // }

      // config.resolve.modules.unshift(__dirname)

      // config.resolve.extensions.push('.ts', '.tsx')
      // Object.keys(overwrites).forEach(key => {
      //   config.resolve.alias[key] = overwrites[key]
      // })

      config.resolve.plugins.push(new TsconfigPathsPlugin())


      // polyfills
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (
          entries['main.js'] &&
          !entries['main.js'].includes('client/polyfills.js')
        ) {
          entries['main.js'].unshift('client/polyfills.js')
        }
        return entries
      }


      return config
    }
    // webpack: (config, {buildId, dev, isServer, defaultLoaders}) => config,
    // workboxOpts: {
    //   swDest: 'static/service-worker.js',
    //   runtimeCaching: [
    //     {
    //       urlPattern: /^https?.*/,
    //       handler: 'networkFirst',
    //       options: {
    //         cacheName: 'https-calls',
    //         networkTimeoutSeconds: 15,
    //         expiration: {
    //           maxEntries: 150,
    //           maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
    //         },
    //         cacheableResponse: {
    //           statuses: [0, 200]
    //         }
    //       }
    //     }
    //   ]
    // }
  }
  return defaults
}

module.exports = nextjsConfigGen
