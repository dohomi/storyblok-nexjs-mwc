export function linkHandler (props = {}, link = {}, options = {}) {
  let isInternalLink = link.linktype === 'story'
  if (isInternalLink) {
    props.to = !link.cached_url.startsWith('/') ? `/${link.cached_url}` : link.cached_url
  } else {
    let href = link.cached_url || ''
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
