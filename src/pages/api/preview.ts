import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const currentSlug = req.query.slug
  if (/* req.query.secret !== 'MY_SECRET_TOKEN' || */!currentSlug || typeof currentSlug !== 'string') {
    return res.status(401).json({ message: 'Invalid token/slug' })
  }

  res.setPreviewData({})
  console.log('inside preview', currentSlug)
  res.writeHead(307, { Location: currentSlug.startsWith('/') ? currentSlug : `/${currentSlug}`/*post.slug*/ })

  res.end()
}
