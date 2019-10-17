import SbEditable from 'storyblok-react'
import { Card } from '@rmwc/card'
import CardLink from './CardLink'
import React, { CSSProperties, FunctionComponent } from 'react'
import clsx from 'clsx'
import CardWrapWithAction from './CardWrapWithAction'
import { CardListItemProps } from './cards'


const CardWrap: FunctionComponent<CardListItemProps> = ({ children, content, options }) => {
  const className = clsx({
    [`mdc-elevation--z${options.elevation}`]: options.elevation
  })
  const style: CSSProperties = {
    borderRadius: options.border_radius
  }
  const outlined = options.variant && options.variant.includes('outlined')
  if (content.body && content.body.length) {
    return <CardWrapWithAction className={className}
                               content={content}
                               style={style}
                               outlined={!!outlined}
                               options={options} />
  }

  return (
    <SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink {...content}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>
  )
}

export default CardWrap
