require('dotenv').config()
const StoryblokClient = require('storyblok-js-client')
const sm = require('sitemap')

function fetchStories () {
  const client = new StoryblokClient({
    accessToken: process.env.STORYBLOK_PUBLIC
  })

  // let page = 1
  let routes = [] // could start with some
  let results = []
  let count = 0
  let version = 'published'

  const getItems = (page = 1) => {
    return client.get('cdn/links', {
      version,
      page
    }).then(res => {
      let links = Object.values(res.data.links)
      results.push(...links)
      count += links.length

      if (count !== res.total && page <= Math.ceil(res.total / res.perPage)) {
        return getItems(page + 1)
      }
    })
  }

  return getItems()
    .then(() => {
      results.forEach((link) => {
        routes.push('/' + (link.slug == 'home' ? '' : link.slug))
      })
      return routes
    })
}


function generateSitemap (req, res) {

  return fetchStories()
    .then((result) => {
      const sitemapUrls = result.map(item => {
        return {
          url: item,
          priority: 0.5
        }
      })
      const options = {
        hostname: 'http://example.com',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: sitemapUrls
        // [
        // {url: '/page-1/', changefreq: 'daily', priority: 0.3},
        //   {url: '/page-2/', changefreq: 'monthly', priority: 0.7},
        //   {url: '/page-3/'},    // changefreq: 'weekly',  priority: 0.5
        //   {url: '/page-4/', img: 'http://urlTest.com'}
        // ]
      }
      const sitemap = sm.createSitemap(options)

      return sitemap.toXML(function (err, xml) {
        if (err) {
          console.log(err)
          return res.status(500).end()
        }

        res.setHeader('Content-Type', 'application/xml')
        res.end(xml)
      })
    })
    .catch(e => {
      console.log(e)
      res.end('error')
    })

}

module.exports = generateSitemap
