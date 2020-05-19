import { NextApiRequest, NextApiResponse } from 'next'
import StoryblokService from '../../src/utils/StoryblokService'
import { fetchSharedStoryblokContent } from '../../src/utils/initial-props/storyblokDeliveryResolver'

export default async function(req: NextApiRequest, res: NextApiResponse) {

  const locale = req.query.locale
  StoryblokService.setDevMode()
  const data = await fetchSharedStoryblokContent(locale ? locale as string : undefined)
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

  res.status(200).json(data)
}
