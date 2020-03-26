import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  let currentSlug = req.query.slug
  if (!currentSlug || typeof currentSlug !== 'string') {
    return res.status(401).json({ message: 'Invalid token/slug' })
  }
  currentSlug = currentSlug.startsWith('/') ? currentSlug : `/${currentSlug}`
  res.setPreviewData({
    query: req.query
  })
  const queryParams = req.query
  delete queryParams.slug
  const searchParams = new URLSearchParams()
  Object.keys(queryParams).forEach((key) => {
    searchParams.append(key, queryParams[key] as string)
  })
  console.log('inside preview', queryParams, searchParams.toString())
  res.writeHead(307, { Location: `${currentSlug}?${searchParams.toString()}` })

  res.end()
}
