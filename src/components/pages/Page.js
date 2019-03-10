import Components from 'components/index'
import SbEditable from 'storyblok-react'

const Page = (props) => {
  let content = props.content
  const body = content.body || []
  if (!body.length) {
    return <div></div>
  }
  return (
    <SbEditable content={content}>
      {body.map((blok) =>
        Components(blok)
      )}
    </SbEditable>
  )
}

export default Page
