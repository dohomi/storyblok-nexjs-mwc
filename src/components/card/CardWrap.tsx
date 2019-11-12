import SbEditable from 'storyblok-react'
import CardLink from './CardLink'
import React, { CSSProperties, FunctionComponent } from 'react'
import CardWrapWithAction from './CardWrapWithAction'
import { CardListItemProps } from './cards'
import Card from '@material-ui/core/Card'


const CardWrap: FunctionComponent<CardListItemProps> = ({ children, content, options }) => {
  const className = 'lm-card'
  const variants = options.variant || []
  const style: CSSProperties = {
    borderRadius: options.border_radius ? options.border_radius : undefined
  }


  if (content.body && content.body.length) {
    return <CardWrapWithAction className={className}
                               content={content}
                               style={style}
                               options={options}>{children}</CardWrapWithAction>
  }

  return (
    <SbEditable content={content}>
      <Card className={className}
            raised={variants.includes('raised')}
            elevation={options.elevation ? Number(options.elevation) : undefined}
            style={style}>
        <CardLink {...content}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>
  )
}

export default CardWrap
