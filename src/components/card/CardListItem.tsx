import CardMediaElement from './CardMediaElement'
import CardWrap from './CardWrap'
import CardListActionTitles from './CardLinkActionTitle'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { CardListItemProps } from './cards'
import CardDescriptionText from './CardDescriptionText'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'


const CardListItem: FunctionComponent<CardListItemProps> = (props) => {
  const { content, options } = props
  const isOverMedia = options.variant && options.variant.includes('over_media')
  const descriptionIsEmpty = isOverMedia && !content.description

  // without media / text only
  if (!content.image || options.hide_image) {
    return (
      <CardWrap {...props}>
        <CardActionArea>
          <CardContent>
            <CardListActionTitles {...props} />
            <CardDescriptionText {...props} />
          </CardContent>
        </CardActionArea>
      </CardWrap>
    )
  }

  // header on top
  if (options.variant && options.variant.includes('header_top')) {
    return (
      <CardWrap {...props}>
        <CardContent>
          <CardListActionTitles {...props} />
        </CardContent>
        <CardActionArea>
          <CardMediaElement {...props} />
          {!descriptionIsEmpty && (
            <CardContent>
              <CardDescriptionText {...props} />
            </CardContent>
          )}
        </CardActionArea>
      </CardWrap>
    )
  }
  // header over media or title bottom
  return (
    <CardWrap {...props}>
      <CardActionArea>
        <CardMediaElement {...props}>
          {isOverMedia && (
            <CardContent>
              <CardListActionTitles {...props} />
            </CardContent>
          )}
        </CardMediaElement>
        {!descriptionIsEmpty && (!isOverMedia && (content.title || content.subtitle)) && (
          <CardContent>
            {!isOverMedia && <CardListActionTitles {...props} />}
            <CardDescriptionText {...props} />
          </CardContent>
        )}
      </CardActionArea>
    </CardWrap>
  )
}

export default CardListItem
