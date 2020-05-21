import { LmStoryblokService } from 'lumen-cms-core'
import { NextApiRequest, NextApiResponse } from 'next'
import { clearFileCache } from '../../utils/initial-props/fileCache'

export default function clearCache(_req: NextApiRequest, res: NextApiResponse) {
  LmStoryblokService.flushCache()
  clearFileCache()

  res.status(200).json({
    message: 'Cache flushed'
  })

}
