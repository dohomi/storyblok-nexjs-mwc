import Components from '@components'
import { StaticSectionStoryblok } from '../../typings/generated/components-schema'
import React from 'react'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { useAppContext } from '../provider/AppProvider'

export type LmStaticSectionProps = { content: StaticSectionStoryblok }

export function LmStaticSection({ content }: LmStaticSectionProps): JSX.Element | null {
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
