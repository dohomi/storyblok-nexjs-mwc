// @ts-ignore
import Components from '@components'
import SbEditable from 'storyblok-react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { FunctionComponent } from 'react'
import { PageStoryblok } from '../../typings/generated/components-schema'
import PageWithDrawer from './PageWithDrawer'
import { Toolbar } from '@material-ui/core'

const Page: FunctionComponent<{ content: PageStoryblok }> = (props) => {
  let content = props.content
  const body = content.body || []
  const rightBody = content.right_body || []
  if (!body.length) {
    return <div>There is no content yet...</div>
  }
  const hasFeature = content.property && content.property.includes('has_feature')
  return (
    <SbEditable content={content}>
      <ParallaxProvider>
        {!hasFeature && <Toolbar/>}
        {rightBody.length > 0 && (
          <PageWithDrawer rightBody={rightBody} body={body} />
        )}
        {!rightBody.length && body.map((blok) => Components(blok))}
      </ParallaxProvider>
    </SbEditable>
  )
}

export default Page
