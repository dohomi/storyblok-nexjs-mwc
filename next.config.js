let config
if (process.env.NODE_ENV === 'production') {
  config = require('./config_prod')
} else {
  config = require('./config_dev')
}

module.exports = config({
  STORYBLOK_PREVIEW: 'ppVDdzB1OJZxrF5YU0GJuwtt',
  STORYBLOK_PUBLIC: 'pw7SspcUSyyy8h6XSsBJhwtt'
})
