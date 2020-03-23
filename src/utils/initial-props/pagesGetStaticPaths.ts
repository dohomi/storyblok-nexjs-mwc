import { GetStaticPaths } from 'next'
import { PageItem } from '../../typings/generated/schema'
import StoryblokService from '../StoryblokService'
import { getStoryblokPagesConfig } from '../../pages/api/sitemap'
import { internalLinkHandler } from '../linkHandler'

const pagesGetStaticPaths: GetStaticPaths = async () => {
  const stories: PageItem[] = await StoryblokService.getAll('cdn/stories', getStoryblokPagesConfig())

  let paths = stories.map(pageItem => {
    return {
      params: {
        index: internalLinkHandler(pageItem.full_slug as string).split('/').filter(i => i)
      }
    }
  })

  // paths = paths.slice(0, 3)
  //
  // console.log(paths[0], paths[1], paths[2])

  return {
    paths,
    fallback: true
  }
}

export default pagesGetStaticPaths

