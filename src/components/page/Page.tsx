// @ts-ignore
import Components from 'components'
import SbEditable from 'storyblok-react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { FunctionComponent } from 'react'
import { PageStoryblok } from '../../typings/generated/components-schema'

const Page: FunctionComponent<{ content: PageStoryblok }> = (props) => {
  let content = props.content
  const body = content.body || []
  if (!body.length) {
    return <div>There is no content yet...</div>
  }
  return (
    <SbEditable content={content}>
      <ParallaxProvider>
        {body.map((blok) =>
          Components(blok)
        )}
      </ParallaxProvider>
    </SbEditable>
  )
}

export default Page
