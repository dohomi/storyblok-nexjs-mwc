const config = require('./nextjs_dev_config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

console.log('hallo: ', process.env.previewToken)

module.exports = config({
  previewToken: process.env.previewToken,
  publicToken: process.env.publicToken,
  languages: process.env.languages,
  defaultLocale: process.env.defaultLocale,
  rootDirectory: process.env.rootDirectory,
  overwriteLocale: process.env.overwriteLocale,
  suppressSlugLocale: process.env.suppressSlugLocale,
  suppressSlugIncludeDefault: process.env.suppressSlugIncludeDefault,
  TAWKTO: process.env.TAWKTO
})
