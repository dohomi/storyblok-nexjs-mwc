import CardMediaElement from './CardMediaElement'
import CardWrap from './CardWrap'
import CardListActionTitles from './CardLinkActionTitle'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import CardDescriptionText from './CardDescriptionText'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

const CardListItem: FunctionComponent<CardListItemProps> = ({ content, options }) => {
  const isOverMedia = options.variant && options.variant.includes('over_media')
  const descriptionIsEmpty = isOverMedia && !content.description

  // without media / text only
  if (!content.image || options.hide_image) {
    return (
      <CardWrap content={content} options={options}>
        <CardActionArea>
          <CardContent className="lm-card__content lm-card__content-padding">
            <CardListActionTitles content={content} options={options} />
            <CardDescriptionText content={content} options={options} />
          </CardContent>
        </CardActionArea>
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
        <CardActionArea>
          <CardMediaElement content={content} options={options} />
          {!descriptionIsEmpty && (
            <CardContent className="lm-card__content lm-card__content-padding">
              <CardDescriptionText content={content} options={options} />
            </CardContent>
          )}
        </CardActionArea>
      </CardWrap>
    )
  }
  // header over media or title bottom
  return (
    <CardWrap content={content} options={options}>
      <CardActionArea>
        <CardMediaElement content={content} options={options}>
          {isOverMedia && (
            <CardContent className="lm-card__content">
              <CardListActionTitles content={content} options={options} />
            </CardContent>
          )}
        </CardMediaElement>
        {!descriptionIsEmpty && (
          <CardContent className="lm-card__content lm-card__content-padding">
            {!isOverMedia && <CardListActionTitles content={content} options={options} />}
            <CardDescriptionText content={content} options={options} />
          </CardContent>
        )}
      </CardActionArea>
    </CardWrap>
  )
}

export default CardListItem
