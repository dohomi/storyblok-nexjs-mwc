/**
 *
 * @param props
 * @param link
 */
export function linkHandler (props = {}, link = {}) {
  let isInternalLink = link.linktype === 'story'
  if (isInternalLink) {
    props.to = !link.cached_url.startsWith('/') ? `/${link.cached_url}` : link.cached_url
  } else {
    let href = link.cached_url
    if (href.includes('@')) {
      href = `mailto:${href}`
    } else if (href.includes('+')) {
      href = `tel:${href.replace('+', '00')}`
    }
    props.href = href
  }
}
