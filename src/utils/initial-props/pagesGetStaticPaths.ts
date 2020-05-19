import { GetStaticPaths } from 'next'
import { PageItem } from '../../typings/generated/schema'
import StoryblokService from '../StoryblokService'
import { internalLinkHandler } from '../linkHandler'
import { initSharedContentFromStoryblok } from './storyblokDeliveryResolver'
import { getStoryblokPagesConfig } from './storyblokPagesConfig'

const pagesGetStaticPaths: GetStaticPaths = async () => {
  const stories: PageItem[] = await StoryblokService.getAll('cdn/stories', getStoryblokPagesConfig())

  await initSharedContentFromStoryblok()

  let paths = stories.map(pageItem => {
    return {
      params: {
        index: internalLinkHandler(pageItem.full_slug as string).split('/').filter(i => i)
      }
    }
  })

  // todo: different loading mode for root folder and language handling
  // paths = paths.slice(0, 3)
  //
  // console.log(paths[0], paths[1], paths[2])

  return {
    paths,
    fallback: true
  }
}

export default pagesGetStaticPaths

