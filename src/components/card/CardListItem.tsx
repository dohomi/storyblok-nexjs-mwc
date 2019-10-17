import { CardMediaContent, CardPrimaryAction } from '@rmwc/card'
import { Typography, TypographyT } from '@rmwc/typography'
import CardMediaElement from './CardMediaElement'
import CardWrap from './CardWrap'
import CardListActionTitles from './CardLinkActionTitle'
import * as React from 'react'
import { FunctionComponent } from 'react'
import clsx from 'clsx'
import { CardListItemProps } from './cards'

const CardListItem: FunctionComponent<CardListItemProps> = ({ content, options }) => {
  const isOverMedia = options.variant && options.variant.includes('over_media')
  const descriptionIsEmpty = isOverMedia && !content.description
  const useTypo: TypographyT = options.description_typography || 'body1'
  const typographyClassName = clsx(options.description_class_name && options.description_class_name.values)

  // without media / text only
  if (!content.image) {
    return (
      <CardWrap content={content} options={options}>
        <CardPrimaryAction>
          <div className="lm-card__content lm-card__content-padding">
            <CardListActionTitles content={content} options={options} />
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
  if (options.variant && options.variant.includes('header_top')) {
    return (
      <CardWrap content={content} options={options}>
        <div className="lm-card__content-padding">
          <CardListActionTitles content={content} options={options} />
        </div>
        <CardPrimaryAction>
          <CardMediaElement content={content} options={options} />
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
    <CardWrap content={content} options={options}>
      <CardPrimaryAction>
        <CardMediaElement content={content} options={options}>
          {isOverMedia && (
            <CardMediaContent className="lm-card__content">
              <CardListActionTitles content={content} options={options} />
            </CardMediaContent>
          )}
        </CardMediaElement>
        {!descriptionIsEmpty && (
          <div className="lm-card__content lm-card__content-padding">
            {!isOverMedia && <CardListActionTitles content={content} options={options} />}
            {content.description && (
              <Typography tag="div"
                          use={useTypo}
                          className={typographyClassName}>
                {content.description}
              </Typography>
            )}
          </div>
        )}
      </CardPrimaryAction>
    </CardWrap>
  )
}

export default CardListItem
