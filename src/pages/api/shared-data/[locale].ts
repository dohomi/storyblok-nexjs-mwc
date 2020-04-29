import { NextApiRequest, NextApiResponse } from 'next'
import { fetchSharedStoryblokContent } from '@initialData/storyblokDeliveryResolver'

export default async function(req: NextApiRequest, res: NextApiResponse) {

  const locale = req.query.locale
  console.log(locale)
  const data = await fetchSharedStoryblokContent(locale ? locale as string : undefined)
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')

  res.status(200).json(data)
}
