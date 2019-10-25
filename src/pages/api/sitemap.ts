import { PageItem } from '../../typings/generated/schema'
import StoryblokService from '../../utils/StoryblokService'
import { SitemapStream, streamToPromise } from 'sitemap'
// import { createGzip } from 'zlib'
import { IncomingMessage, ServerResponse } from 'http'

export default async function sitemapFunc(req: IncomingMessage, res: ServerResponse) {

  res.setHeader('Content-Type', 'text/xml')
  // res.setHeader('Content-Encoding', 'gzip')
  try {
    StoryblokService.setToken('Xzl0aUdUwWqtCsD37fHMmQtt')
    const stories: PageItem[] = await StoryblokService.getAll('cdn/stories', {
      filter_query: {
        component: {
          in: 'page'
        },
        meta_robots: {
          not_in: true
        }
      }
    })
    const smStream = new SitemapStream({ hostname: 'https://' + req.headers.host })
    // const pipeline = smStream.pipe(createGzip())

    for (const story of stories) {
      // console.log(story.full_slug)
      smStream.write({
        url: story.full_slug,
        published: story.published_at
      })
    }
    smStream.end()
    // streamToPromise(pipeline).then(_sm => {
    //   console.log('stream to promise')
    // })
    const sitemap = await streamToPromise(smStream)
      .then(sm => sm.toString())
    // pipeline
    //   .pipe(res)
    //   .on('error', e => {
    //     throw e
    //   })
    res.write(sitemap)
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}
