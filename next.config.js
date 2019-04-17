let config
if (process.env.NODE_ENV === 'production') {
  config = require('./config_prod')
} else {
  config = require('./config_dev')
}

module.exports = config({
  STORYBLOK_PREVIEW: 'h4irkhjH5C5djHiI8f76rQtt',
  STORYBLOK_PUBLIC: 'rngGl9hhQWVCizcr1WRDJQtt'
})
