import SbEditable from 'storyblok-react'

const Html = ({content}) => {
  const innerHtml = {
    __html: content.body
  }

  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={innerHtml}></div>
    </SbEditable>
  )
}

export default Html
