import { Typography } from '@rmwc/typography'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import clsx from 'clsx'

const CardListActionTitles: FunctionComponent<CardListItemProps> = ({ content, options }) => {
  const titleStyles: CSSProperties = {}
  if (options.variant && options.variant.includes('title_top')) {
    titleStyles.position = 'absolute'
    titleStyles.top = '16px'
  }
  return (
    <div>
      {content.title && <Typography tag={options.title_tag || 'h3'}
                                    style={titleStyles}
                                    className={clsx(options.title_class_name && options.title_class_name.values)}
                                    use={options.title_typography || 'headline6'}>{content.title}</Typography>}
      {content.subtitle && <Typography tag={options.subtitle_tag || 'h4'}
                                       className={clsx(options.subtitle_class_name && options.subtitle_class_name.values)}
                                       use={options.subtitle_typography || 'subtitle2'}>{content.subtitle}</Typography>}
    </div>
  )
}
export default CardListActionTitles
