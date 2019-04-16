import {
  CardPrimaryAction,
  CardMediaContent
} from '@rmwc/card'
import {Typography} from '@rmwc/typography'
import {getImageAttrs} from '../../../utils/ImageService'
import clsx from 'clsx'
import CardMediaElement from './CardMediaElement'
import CardWrap from './CardWrap'
import CardListActionTitles from './CardLinkActionTitle'
import {useState} from 'react'
import {getImage} from '../../../utils/fetchImageHelper'

const CardListItem = (content) => {
  let variant = content.variant || []
  const cardClasses = clsx({
    [`mdc-elevation--z${content.elevation}`]: content.elevation
  })
  const [styles, setStyles] = useState({
    color: variant.includes('font_white') ? 'white' : 'inherit'
  })

  if (content.inView && !styles.backgroundImage) {
    const img = getImageAttrs({
      originalSource: content.image,
      width: content.mediaDimension.width,
      height: content.mediaDimension.height,
      smart: true
    })
    getImage({
      ...img,
      onReady(src){
        setStyles({
          ...styles,
          backgroundImage: `url("${src}")`,
          filter: 'blur(0)',
          backgroundColor: 'transparent'
        })
      }
    })
  }
  const cardStyles = {}
  content.borderRadius && (cardStyles.borderRadius = content.borderRadius)
  const isOverMedia = variant.includes('over_media')
  const descriptionIsEmpty = isOverMedia && !content.description
  const cardwrapProps = {
    content,
    style: cardStyles,
    className: cardClasses,
    outlined: variant.includes('outlined')
  }
  const cardMediaProps = {
    style: styles,
    sixteenByNine: content.sixteenByNine,
    square: content.square
  }

  // without media / text only
  if (!content.image) {
    return (
      <CardWrap {...cardwrapProps}>
        <CardPrimaryAction>
          <div className="lm-card__content lm-card__content-padding">
            {CardListActionTitles(content)}
            {content.description &&
            <Typography tag="p" use={content.descriptionTypography || 'body1'}>{content.description}</Typography>}
          </div>
        </CardPrimaryAction>
      </CardWrap>
    )
  }

  // header on top
  if (variant.includes('header_top')) {
    return (
      <CardWrap {...cardwrapProps}>
        <div className="lm-card__content-padding">
          {CardListActionTitles(content)}
        </div>
        <CardPrimaryAction>
          <CardMediaElement {...cardMediaProps}/>
          {!descriptionIsEmpty && (
            <div className="lm-card__content lm-card__content-padding">
              {content.description &&
              <Typography tag="p" use={content.descriptionTypography || 'body1'}>{content.description}</Typography>}
            </div>
          )}
        </CardPrimaryAction>
      </CardWrap>
    )
  }
  // header over media or title bottom
  return (
    <CardWrap {...cardwrapProps}>
      <CardPrimaryAction>
        <CardMediaElement {...cardMediaProps}>
          {isOverMedia && (
            <CardMediaContent className="lm-card__content">{CardListActionTitles(content)}</CardMediaContent>
          )}
        </CardMediaElement>
        {!descriptionIsEmpty && (
          <div className="lm-card__content lm-card__content-padding">
            {!isOverMedia && CardListActionTitles(content)}
            {content.description &&
            <Typography tag="div" use={content.descriptionTypography || 'body1'}>{content.description}</Typography>}
          </div>
        )}
      </CardPrimaryAction>
    </CardWrap>
  )
}

export default CardListItem
