import StoryblokService from '../../utils/StoryblokService'
import { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  StoryblokService.flushCache()
  res.status(200).json({
    message: 'Cache flushed'
  })

}
