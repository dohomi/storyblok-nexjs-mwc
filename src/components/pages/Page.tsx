// @ts-ignore
import Components from 'components/index'
import SbEditable from 'storyblok-react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { NextPage } from 'next'

const Page: NextPage = (props) => {
  let content = props.content
  const body = content.body || []
  if (!body.length) {
    return <div></div>
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
