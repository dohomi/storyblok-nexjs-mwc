import Components from 'components/index'
import SbEditable from 'storyblok-react'

const Footer = (props) => {
  const content = props.settings && props.settings.footer || []
  return (
    <SbEditable content={props.settings}>
      <footer>
        {content.map((blok) =>
          Components(blok)
        )}
      </footer>
    </SbEditable>
  )
}

export default Footer
