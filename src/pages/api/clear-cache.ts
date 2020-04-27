import StoryblokService from '../../utils/StoryblokService'
import { NextApiRequest, NextApiResponse } from 'next'
import { diskCache } from '@initialData/fileCache'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  StoryblokService.flushCache()
  diskCache.reset()

  res.status(200).json({
    message: 'Cache flushed'
  })

}
