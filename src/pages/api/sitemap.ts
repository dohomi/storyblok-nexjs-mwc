import { PageItem } from '../../typings/generated/schema'
import StoryblokService from '../../utils/StoryblokService'
import { SitemapStream, streamToPromise } from 'sitemap'
// import { createGzip } from 'zlib'
import { IncomingMessage, ServerResponse } from 'http'
import { CONFIG } from '../../utils/StoriesService'
import { internalLinkHandler } from '../../utils/linkHandler'

export default async function(req: IncomingMessage, res: ServerResponse) {

  // res.setHeader('Content-Encoding', 'gzip')
  try {
    const params: any = {
      per_page: 100,
      excluding_fields: 'body,right_body,meta_robots,property,meta_title,meta_description,seo_body,preview_title,preview_subtitle,preview_image,preview_teaser',
      sort_by: 'published_at:desc',
      filter_query: {
        component: {
          in: 'page'
        },
        meta_robots: {
          not_in: true
        }
      }
    }
    if (CONFIG.rootDirectory) {
      params.starts_with = `${CONFIG.rootDirectory}/`
    }
    const stories: PageItem[] = await StoryblokService.getAll('cdn/stories', params)
    const smStream = new SitemapStream({ hostname: 'https://' + req.headers.host })
    const ignoreList = (process.env.sitemapIgnorePath && process.env.sitemapIgnorePath.split(',')) || []

    ignoreList.push('demo-content')

    for (const story of stories) {
      const fullSlug = story.full_slug as string
      const shouldIndex = !ignoreList.some((ignorePath: string) => fullSlug.includes(ignorePath))
      if (shouldIndex) {
        const isHome = story.slug === 'home'
        if (isHome) {
          smStream.write({
            url: fullSlug.replace('home', ''),
            lastmod: story.published_at,
            priority: 1.0
          })
        } else {
          smStream.write({
            url: internalLinkHandler(fullSlug),
            lastmod: story.published_at,
            priority: 0.5
          })
        }
      }
    }
    smStream.end()

    const sitemap = await streamToPromise(smStream)
      .then(sm => sm.toString())

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
    res.write(sitemap)
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}
