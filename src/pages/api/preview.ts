import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  let currentSlug = req.query.slug
  if (/* req.query.secret !== 'MY_SECRET_TOKEN' || */!currentSlug || typeof currentSlug !== 'string') {
    return res.status(401).json({ message: 'Invalid token/slug' })
  }
  currentSlug = currentSlug.startsWith('/') ? currentSlug : `/${currentSlug}`
  res.setPreviewData({
    query: req.query
  })

  console.log('preview.ts', req.query)
  res.writeHead(307, { Location: currentSlug.startsWith('/') ? currentSlug : `/${currentSlug}`/*post.slug*/ })

  res.end()
}
