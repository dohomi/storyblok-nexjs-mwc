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
  const src = imageService(image, path)
  return `url("${src}")`
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

const CardListItem = (content) => {
  let variant = content.variant || []
  let mediaStyles = {}
  if (content.mediaDimension && content.mediaDimension.width) {
    mediaStyles = {
      backgroundImage: getBackgroundImageSource({
        image: content.image,
        properties: [],
        width: 42,
        height: 42
      })
    }
  }

  const cardClasses = clsx({
    [`mdc-elevation--z${content.elevation}`]: content.elevation
  })
  if (content.inView) {
    mediaStyles.backgroundImage = getBackgroundImageSource({
      image: content.image,
      properties: [],
      width: content.mediaDimension.width,
      height: content.mediaDimension.height
    })
    mediaStyles.filter = 'blur(0)'
  }
  variant.includes('font_white') && (mediaStyles.color = 'white')
  const cardStyles = {}
  content.borderRadius && (cardStyles.borderRadius = content.borderRadius)
  return (
    <SbEditable content={content}>
      <Card className={cardClasses} style={cardStyles} outlined={variant.includes('outlined')}>
        <CardLink link={content.link}>
          <CardPrimaryAction>
            <CardMedia style={mediaStyles}
                       sixteenByNine={content.sixteenByNine}
                       className="progressive-img-container"
                       square={content.square}>
              {variant.includes('over_media') &&
              <CardMediaContent className="lm-card__content">{CardListActionTitles(content)}</CardMediaContent>}
            </CardMedia>
            <div style={{padding: '1rem'}} className="lm-card__content">
              {!variant.includes('over_media') && CardListActionTitles(content)}
              {content.description && <Typography tag="div" use="body1">{content.description}</Typography>}
            </div>
          </CardPrimaryAction>
        </CardLink>
      </Card>
    </SbEditable>
  )
}

export default CardListItem
