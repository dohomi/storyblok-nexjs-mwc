import Typography from '@material-ui/core/Typography'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import clsx from 'clsx'
import { mapTypographyVariant } from '../../utils/muiMapProps'

const CardListActionTitles: FunctionComponent<CardListItemProps> = ({ content, options }) => {
  const titleStyles: CSSProperties = {}
  if (options.variant && options.variant.includes('title_top')) {
    // titleStyles.position = 'absolute'
    // titleStyles.top = '16px'
  }
  return (
    <>
      {content.title && <Typography component={options.title_tag || 'h3'}
                                    style={titleStyles}
                                    className={clsx(options.title_class_name && options.title_class_name.values)}
                                    variant={mapTypographyVariant[options.title_typography ? options.title_typography as string : 'headline6']}>{content.title}</Typography>}
      {content.subtitle && <Typography component={options.subtitle_tag || 'h4'}
                                       className={clsx(options.subtitle_class_name && options.subtitle_class_name.values)}
                                       variant={mapTypographyVariant[options.subtitle_typography ? options.subtitle_typography as string : 'subtitle2']}>{content.subtitle}</Typography>}
    </>
  )
}
export default CardListActionTitles
