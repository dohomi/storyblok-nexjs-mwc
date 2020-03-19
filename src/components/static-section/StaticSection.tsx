import Components from '@components'
import { StaticSectionStoryblok } from '../../typings/generated/components-schema'
import React, { FunctionComponent } from 'react'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { useAppContext } from '../provider/AppProvider'

const StaticSection: FunctionComponent<{ content: StaticSectionStoryblok }> = ({ content }) => {
  if (!content.container) {
    return null
  }

  const { allStaticContent } = useAppContext()
  const containerContent = allStaticContent.find((item) => item.uuid === content.container)
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
