import SbEditable from 'storyblok-react'

const Html = ({content}) => {
  function createInner(){
    return {
      __html:content.body
    }
  }
  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={createInner()}></div>
    </SbEditable>
  )
}

export default Html
