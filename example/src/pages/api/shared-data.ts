import { NextApiRequest, NextApiResponse } from 'next'
import { LmStoryblokService } from 'lumen-cms-core'
import { fetchSharedStoryblokContent } from '../../utils/initial-props/storyblokDeliveryResolver'

export default async function sharedData(req: NextApiRequest, res: NextApiResponse) {
  const locale = req.query.locale
  LmStoryblokService.setDevMode()
  const data = await fetchSharedStoryblokContent(locale ? locale as string : undefined)
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

  res.status(200).json(data)
}
