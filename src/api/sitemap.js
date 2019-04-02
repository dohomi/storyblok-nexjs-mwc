require('dotenv').config()
const StoryblokClient = require('storyblok-js-client')
const sm = require('sitemap')

/**
 *
 * @param ignoreInPath
 * @return {*}
 */
function fetchStories (ignoreInPath = []) {
  const client = new StoryblokClient({
    accessToken: process.env.STORYBLOK_PUBLIC
  })

  // let page = 1
  let routes = [] // could start with some
  let results = []
  let count = 0
  let version = 'published'
  const getItems = (page = 1) => {
    return client.get('cdn/stories', {
      version,
      filter_query: {
        component: {
          in: 'page'
        },
        meta_robots: {
          not_in: true
        }
      },
      page
    }).then(res => {
      let links = Object.values(res.data.stories)
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
        const fullSlug = link.full_slug
        const isStartpage = fullSlug === 'home'
        /**
         *
         * @type {{isStartpage: boolean | 0 | 1, name: *, language: *, published: string, robots: *, firstPublished: *, fullSlug: string}}
         */
        const obj = {
          firstPublished: link.first_published_at,
          isStartpage: isStartpage,
          name: link.name,
          slug: isStartpage ? '' : fullSlug,
          published: link.published_at,
          language: link.lang,
          robots: link.content.meta_robots
        }
        if (ignoreInPath.some(slug => fullSlug.includes(slug))) {
          return
        }
        routes.push(obj)
        // routes.push('/' + (link.slug == 'home' ? '' : link.slug))
      })
      return routes
    })
}

function fetchLinks () {
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

/**
 *
 * @param req
 * @param res
 * @param ignorePaths example: ['demo-content', 'services-folder']
 * @return {Q.Promise<any> | * | Promise<T | never>}
 */
function generateSitemapOnStory (req, res, ignorePaths = []) {
  const host = req && req.headers && req.headers.host

  return fetchStories(ignorePaths)
    .then((result) => {
      const sitemapUrls = result.map(item => {
        return {
          url: item.slug,
          priority: 0.5,
          lastmodISO: item.published
        }
      })
      console.log(sitemapUrls.length)
      const protocol = req.connection.encrypted ? 'https' : 'http'
      const options = {
        hostname: host ? `${protocol}://${host}` : 'http://example.com',
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

function generateSitemapOnLink (req, res) {
  const host = req && req.headers && req.headers.host
  return fetchLinks()
    .then((result) => {
      const sitemapUrls = result.map(item => {
        return {
          url: item,
          priority: 0.5
        }
      })
      const options = {
        hostname: host || 'http://example.com',
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

module.exports = {generateSitemapOnLink, generateSitemapOnStory}
