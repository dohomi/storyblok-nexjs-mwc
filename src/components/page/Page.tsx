import Components from '@components'
import SbEditable from 'storyblok-react'
import { ParallaxProvider } from 'react-scroll-parallax'
import React, { FunctionComponent } from 'react'
import { PageStoryblok } from '../../typings/generated/components-schema'
import PageWithDrawer from './PageWithDrawer'

const Page: FunctionComponent<{ content: PageStoryblok }> = (props) => {
  let content = props.content
  const body = content.body || []
  const rightBody = content.right_body || []

  if (!body.length) {
    return <div>There is no content yet...</div>
  }

  if (!body.some(i => i.component === 'section_parallax')) {
    return (
      <SbEditable content={content}>
        {rightBody.length > 0 && (
          <PageWithDrawer rightBody={rightBody} body={body} />
        )}
        {!rightBody.length && body.map((blok) => Components(blok))}
      </SbEditable>
    )
  }
  return (
    <SbEditable content={content}>
      <ParallaxProvider>
        {rightBody.length > 0 && (
          <PageWithDrawer rightBody={rightBody} body={body} />
        )}
        {!rightBody.length && body.map((blok) => Components(blok))}
      </ParallaxProvider>
    </SbEditable>
  )
}

export default Page
