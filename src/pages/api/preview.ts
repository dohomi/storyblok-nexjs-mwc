import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (/* req.query.secret !== 'MY_SECRET_TOKEN' || */!req.query.slug) {
    return res.status(401).json({ message: 'Invalid token/slug' })
  }
  res.setPreviewData({slug: req.query.slug})
  console.log("inside preview", req.query.slug)
  res.writeHead(307, { Location: req.query.slug/*post.slug*/ })

  res.end()
}
