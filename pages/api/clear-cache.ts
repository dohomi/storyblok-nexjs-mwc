import StoryblokService from '../../src/utils/StoryblokService'
import { NextApiRequest, NextApiResponse } from 'next'
import { clearFileCache } from '../../src/utils/initial-props/fileCache'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  StoryblokService.flushCache()
  clearFileCache()

  res.status(200).json({
    message: 'Cache flushed'
  })

}
