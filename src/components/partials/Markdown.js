import marked from 'marked'

const Markdown = (props = {}) => {
  const componentProps = {
    className: props.className
  }
  if (props.style) {
    componentProps.style = props.style
  }

  const rawMarkupFunc = () => {
    const renderer = new marked.Renderer()
    //
    renderer.link = function (href, title, text) {
      if (href.includes('@')) {
        href = `mailto:${href}`
      } else if (href.includes('+')) {
        href = `tel:${href.replace('+', '')}`
      } else if (href.startsWith('http')) {
        return `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${text}</a>`
      }
      return `<a href="${href}" title="${title}">${text}</a>`

      // const l = parser.link(href,title,text)
      // console.log(href, title, text)
      // console.log(l)
      // return l
      // const CurrentLink = (
      //   <Link to={href}><a>{text}</a></Link>
      // )
      // // return render('<a></a>',)
      // // return {CurrentLink}
      // return render(<Link route={`${href}`}>{text}</Link>,'a')
    }

    const rawMarkup = marked(props.content, {
      sanitize: true,
      renderer
    })
    return {__html: rawMarkup}
  }

  return (
    <div {...componentProps}
         dangerouslySetInnerHTML={rawMarkupFunc()}></div>
  )

}

export default Markdown
