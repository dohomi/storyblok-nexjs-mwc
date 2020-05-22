import { ParallaxProvider } from 'react-scroll-parallax'
import React from 'react'
import { PageStoryblok } from '../../typings/generated/components-schema'
import RightDrawer from './RightDrawer'
import MainContent from './MainContent'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmPageProps = CoreComponentProps & { content: PageStoryblok }

export function LmPage({ content, ComponentRender }: LmPageProps): JSX.Element {
  const body = content.body || []
  const rightBody = content.right_body || []

  if (!body.length) {
    return <div>There is no content yet...</div>
  }

  if (!body.some(i => i.component === 'section_parallax')) {
    return (
      <>
        {rightBody.length > 0 && <RightDrawer rightBody={rightBody} body={body} ComponentRender={ComponentRender} />}
        <MainContent body={body} ComponentRender={ComponentRender} />
      </>
    )
  }
  return (
    <ParallaxProvider>
      {rightBody.length > 0 && <RightDrawer rightBody={rightBody} body={body} ComponentRender={ComponentRender} />}
      <MainContent body={body} ComponentRender={ComponentRender} />
    </ParallaxProvider>
  )
}
