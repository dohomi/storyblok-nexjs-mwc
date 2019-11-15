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

export const internalLinkHandler = (url: string) => {
  if (StoriesService.locale) {
    const searchStr = `/${StoriesService.locale}/${StoriesService.locale}/`
    if (url.startsWith(searchStr)) {
      console.log('starts with')
    } else {
      console.log('does not starts with')
    }
    url = url.replace(searchStr, `/${StoriesService.locale}/`)
  }
  return url.startsWith('/') ? `/${url}` : url
}

export const linkHandler = (props: LinkPropsType, link: LinkType, options: LinkOptions) => {
  let isInternalLink = link.linktype === 'story'
  let cachedUrl = link.cached_url as string

  if (isInternalLink) {
    props.to = internalLinkHandler(cachedUrl)
  } else {
    let href = cachedUrl || ''
    if (href.includes('@')) {
      href = `mailto:${href.replace('mailto:', '')}`
    } else if (href.includes('+')) {
      href = `tel:${href.replace('+', '')}`
    }

    if (options.openExternal) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }
    props.href = href
  }
}

export const getLinkAttrs = (link: LinkType = {} as LinkType, options: LinkOptions = {}): LinkPropsType => {
  const linkAttrs: LinkPropsType = {}
  linkHandler(linkAttrs, link, options)
  return linkAttrs
}
