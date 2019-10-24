import StoriesService from './StoriesService'

export type LinkPropsType = {
  to?: string
  href?: string
  rel?: string
  target?: string
}

export interface LinkType {
  cached_url: string
  linktype: string

  [k: string]: any
}

interface LinkOptions {
  openExternal?: boolean
}

export const linkHandler = (props: LinkPropsType, link: LinkType, options: LinkOptions) => {
  let isInternalLink = link.linktype === 'story'
  let cachedUrl = link.cached_url as string

  if (isInternalLink) {
    if (StoriesService.locale) {
      cachedUrl = cachedUrl.replace(`${StoriesService.locale}/${StoriesService.locale}/`, `${StoriesService.locale}/`)
    }
    props.to = !cachedUrl.startsWith('/') ? `/${cachedUrl}` : cachedUrl
  } else {
    let href = cachedUrl || ''
    if (href.includes('@')) {
      href = `mailto:${href}`
    } else if (href.includes('+')) {
      href = `tel:${href.replace('+', '')}`
    }

    if (options.openExternal) {
      props.target = '_blank'
    }
    props.rel = 'noopener noreferrer'
    props.href = href
  }
}
