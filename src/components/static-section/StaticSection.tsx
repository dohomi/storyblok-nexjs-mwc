import Components from '@components'
import { StaticSectionStoryblok } from '../../typings/generated/components-schema'
import StoriesService from '../../utils/StoriesService'
import * as React from 'react'
import { FunctionComponent } from 'react'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const StaticSection: FunctionComponent<{ content: StaticSectionStoryblok }> = ({ content }) => {
  const containerContent = content.container && StoriesService.getStaticContent(content.container)
  const body = (containerContent && containerContent.content && containerContent.content.body) || []

  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        {body.map((blok: any) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default StaticSection
