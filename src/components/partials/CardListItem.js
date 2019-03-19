import SbEditable from 'storyblok-react'
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent
} from '@rmwc/card'
import {Typography} from '@rmwc/typography'
import imageService from '../../utils/ImageService'
import {Link} from 'routes/index'
import clsx from 'clsx'


const getBackgroundImageSource = ({image, properties = [], width, height}) => {
  let path = `${parseInt(width)}x0}`
  if (!properties.includes('contain')) {
    path = `${parseInt(width)}x${parseInt(height)}`
    if (properties.includes('crop')) {
      path += '/smart'
    }
  }
  return imageService(image, path)
}

const CardLink = (props) => {
  const link = props.link || {}
  if (!link.cached_url) {
    return <>{props.children}</>
  }
  const href = `/${link.cached_url}`
  return (
    <Link to={href}>
      <a>
        {props.children}
      </a>
    </Link>
  )
}


const CardListActionTitles = (content) => {
  const titleStyles = {}
  if (content.variant && content.variant.includes('title_top')) {
    titleStyles.position = 'absolute'
    titleStyles.top = '16px'
  }
  return (
    <div>
      {content.title && <Typography tag={content.titleTag || 'h3'}
                                    style={titleStyles}
                                    use={content.titleTypography || 'headline6'}>{content.title}</Typography>}
      {content.subtitle && <Typography tag={content.subtitleTag || 'h4'}
                                       use={content.subtitleTypography || 'subtitle2'}>{content.subtitle}</Typography>}
    </div>
  )
}

const CardWrap = ({children, content, className, style, outlined}) => {
  return (
    <SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink link={content.link}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>
  )
}

const CardMediaElement = ({style, sixteenByNine, square, children}) => {
  return (
    <CardMedia style={style}
               sixteenByNine={sixteenByNine}
               className="progressive-img-container"
               square={square}>
      {children}
    </CardMedia>
  )
}

const CardListItem = (content) => {
  let variant = content.variant || []
  const mediaStyles = {}
  const cardClasses = clsx({
    [`mdc-elevation--z${content.elevation}`]: content.elevation
  })
  if (content.inView) {
    const backgroundImageSource = getBackgroundImageSource({
      image: content.image,
      properties: [],
      width: content.mediaDimension.width,
      height: content.mediaDimension.height
    })
    mediaStyles.backgroundImage = `url("${backgroundImageSource}")`
    mediaStyles.filter = 'blur(0)'
  }
  variant.includes('font_white') && (mediaStyles.color = 'white')
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
    style: mediaStyles,
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
