import { Typography } from '@rmwc/typography'
import { CSSProperties, FunctionComponent } from 'react'
import { CardListItemStoryblok, CardListStoryblok } from '../../typings/generated/components-schema'

export interface CardListItemProps extends CardListItemStoryblok,
  Pick<CardListStoryblok, 'variant' | 'image_size' | 'elevation' | 'border_radius' | 'title_tag' | 'subtitle_tag' | 'title_typography' | 'subtitle_typography' | 'description_typography'> {
  inView: boolean
  mediaDimension: {
    height: number
    width: number
  }
  titleClassName: string
  subtitleClassName: string
  descriptionClassName: string
  sixteenByNine: boolean
  square: boolean
}

const CardListActionTitles: FunctionComponent<CardListItemProps> = (content) => {
  const titleStyles: CSSProperties = {}
  if (content.variant && content.variant.includes('title_top')) {
    titleStyles.position = 'absolute'
    titleStyles.top = '16px'
  }
  return (
    <div>
      {content.title && <Typography tag={content.title_tag || 'h3'}
                                    style={titleStyles}
                                    className={content.titleClassName}
                                    use={content.title_typography || 'headline6'}>{content.title}</Typography>}
      {content.subtitle && <Typography tag={content.subtitle_tag || 'h4'}
                                       className={content.subtitleClassName}
                                       use={content.subtitle_typography || 'subtitle2'}>{content.subtitle}</Typography>}
    </div>
  )
}
export default CardListActionTitles
