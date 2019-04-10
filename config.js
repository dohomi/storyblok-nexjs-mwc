const fiber = require('fibers')
const sass = require('sass')
const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSass = require('@zeit/next-sass')
// withMDX = require('@zeit/next-mdx')(),
// const withOffline = require('next-offline')
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


// STORYBLOK_PREVIEW=W1jvOipRiC2CvR4gxsxjaAtt
// STORYBLOK_PUBLIC=qlDSPW1dzL2DiSmDYRVkwwtt
//
// STORYBLOK_PREVIEW_COMMERCE_CENTRIC=W1jvOipRiC2CvR4gxsxjaAtt
// STORYBLOK_PUBLIC_COMMERCE_CENTRIC=qlDSPW1dzL2DiSmDYRVkwwtt
//
// STORYBLOK_PREVIEW_LUMEN_DEMO=w0nlwuRWpQoDRUbFlwG90gtt
// STORYBLOK_PUBLIC_LUMEN_DEMO=Q1sBHu46elWLrUz87zDeEgtt
//
//
// STORYBLOK_PREVIEW_JUNGTEXTE=nki3pcCyJQn4Gz4YVPtQDAtt
// STORYBLOK_PUBLIC_JUNGTEXTE=LUjyqrMPcBd3M9aWJHfNCQtt
//
// STORYBLOK_PREVIEW_LUMEN=ppVDdzB1OJZxrF5YU0GJuwtt
// STORYBLOK_PUBLIC_LUMEN=pw7SspcUSyyy8h6XSsBJhwtt

const nextConfig = {
  target: 'serverless',
  env: {
    // .env file is not supported with now any longer
    STORYBLOK_PREVIEW: 'ppVDdzB1OJZxrF5YU0GJuwtt',
    STORYBLOK_PUBLIC: 'pw7SspcUSyyy8h6XSsBJhwtt'
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['routes'] = path.join(__dirname, 'routes')
    // polyfills
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/client/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/client/polyfills.js')
      }
      return entries
    }

    return config
  },
  // webpack: (config, {buildId, dev, isServer, defaultLoaders}) => config,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
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

module.exports = function (env = {}) {
  const config = nextConfig
  config.env = {
    ...config.env,
    ...env
  }

  if (process.env.NODE_ENV === 'production') {
    return withPlugins(
      [
        [withSass, sassConfig],
        [withTM]
      ],
      config
    )
  }
  return withPlugins(
    [
      [withBundleAnalyzer, bundleAnalyzerConfig],
      // @zeit/next-sass
      [withSass, sassConfig],
      // @zeit/next-mdx
      // [withMDX],
      // next-offline
      // [withOffline],
      // @zeit/next-source-maps
      [withSourceMaps],
      [withTM]
    ],
    config
  )
}
