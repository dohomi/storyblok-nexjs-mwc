import Components from 'components/index'
import SbEditable from 'storyblok-react'

const Page = (props) => {
  const body = props.content.body || []
  if (!body.length) {
    return <div></div>
  }
  return (
    <SbEditable content={props.content}>
      {body.map((blok) =>
        Components(blok)
      )}
    </SbEditable>
  )
}

export default Page
