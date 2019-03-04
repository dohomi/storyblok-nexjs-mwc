// import {Link} from 'routes'
import marked from 'marked'

const Markdown = (props) => {

  const rawMarkupFunc = () => {
    // const renderer = new marked.Renderer()
    //
    // renderer.link = (href, title, text) => {
    //   console.log(href, title, text)
    //   //   return React(Link, {route: href}, text)
    //   return ReactDOM.render(<Link route={`${href}`}>{text}</Link>)
    // }

    const rawMarkup = marked(props.content, {
      sanitize: true
      //,
      // renderer
    })
    return {__html: rawMarkup}
  }

  return (
    <div className={props.className} dangerouslySetInnerHTML={rawMarkupFunc()}></div>
  )

}

export default Markdown
