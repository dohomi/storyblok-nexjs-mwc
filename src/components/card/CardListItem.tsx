import { CardMediaContent, CardPrimaryAction } from '@rmwc/card'
import { Typography, TypographyT } from '@rmwc/typography'
import clsx from 'clsx'
import CardMediaElement, { CardMediaElementProps } from './CardMediaElement'
import CardWrap from './CardWrap'
import CardListActionTitles, { CardListItemProps } from './CardLinkActionTitle'
import { CSSProperties, FunctionComponent } from 'react'


const CardListItem: FunctionComponent<CardListItemProps> = (content) => {
  let variant = content.variant || []
  const cardClasses = clsx({
    [`mdc-elevation--z${content.elevation}`]: content.elevation
  })

  const cardStyles: CSSProperties = {}
  content.border_radius && (cardStyles.borderRadius = content.border_radius)
  const isOverMedia = variant.includes('over_media')
  const descriptionIsEmpty = isOverMedia && !content.description
  const cardwrapProps = {
    content,
    style: cardStyles,
    className: cardClasses,
    outlined: variant.includes('outlined')
  }
  const cardMediaProps: CardMediaElementProps = {
    image: content.image,
    inView: content.inView,
    width: content.mediaDimension.width,
    height: content.mediaDimension.height,
    variant,
    image_size: content.image_size,
    sixteenByNine: content.sixteenByNine,
    square: content.square
  }

  const useTypo: TypographyT = content.description_typography || 'body1'
  const typographyClassName = content.descriptionClassName
  // without media / text only
  if (!content.image) {
    return (
      <CardWrap {...cardwrapProps}>
        <CardPrimaryAction>
          <div className="lm-card__content lm-card__content-padding">
            {CardListActionTitles(content)}
            {content.description &&
            <Typography tag="p"
                        use={useTypo}
                        className={typographyClassName}>{content.description}</Typography>}
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
          <CardMediaElement {...cardMediaProps} />
          {!descriptionIsEmpty && (
            <div className="lm-card__content lm-card__content-padding">
              {content.description &&
              <Typography tag="p"
                          use={useTypo}
                          className={typographyClassName}>{content.description}</Typography>}
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
            <Typography tag="div"
                        use={useTypo}
                        className={typographyClassName}>{content.description}</Typography>}
          </div>
        )}
      </CardPrimaryAction>
    </CardWrap>
  )
}

export default CardListItem
