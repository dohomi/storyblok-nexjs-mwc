import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import withWindowDimensions from './provider/WithWindowDimensions'

function onImageLoad (ev) {
  console.log(ev)
}

const Image = (item) => {
  let aspectRatioStyles
  if (item.aspectRatio && !item.masonry) {
    const splitAspectRatio = item.aspectRatio.split('x')
    aspectRatioStyles = {paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%`}
  }
  if (aspectRatioStyles) {
    return (
      <div className="mdc-image-list__image-aspect-container" style={aspectRatioStyles}>
        <img src={item.source} className="mdc-image-list__image"/>
      </div>
    )
  }
  return (
    <img src={item.source} className="mdc-image-list__image"/>
  )
}

const ImageList = (props) => {
  const content = props.content
  const elements = content.body
  const imageContainerClasses = clsx(
    'mdc-image-list',
    {
      'mdc-image-list--masonry': !!content.masonry,
      'mdc-image-list--with-text-protection': !!content.text_protection
    }
  )
  let gutterSize = content.column_gap ? parseInt(content.column_gap) : 2
  let columnCount = content.column_count ? parseInt(content.column_count) : 5
  const dimensions = props.dimensions
  if (dimensions.isPhone && content.column_count_phone) {
    columnCount = parseInt(content.column_count_phone)
  }
  if (dimensions.isTablet && content.column_count_tablet) {
    columnCount = parseInt(content.column_count_tablet)
  }

  let listStyles = {}
  // default columns
  let listItemStyles = {
    width: `calc(100% / ${columnCount} - ${Math.round((gutterSize + 1 / columnCount)/100 * 100)}px)`,
    margin: `${gutterSize / 2}px`
  }
  if (content.masonry) {
    // overwrite styles for masonry
    gutterSize = content.column_gap ? parseInt(content.column_gap) : 16
    listStyles = {
      columnCount: columnCount,
      columnGap: `${gutterSize}px`
    }
    listItemStyles = {
      marginBottom: `${gutterSize}px`
    }
  }

  return (
    <SbEditable content={content}>
      <ul className={imageContainerClasses}
          style={listStyles}>
        {elements.map(item => {
          return (
            <li className="mdc-image-list__item"
                key={item._uid}
                style={listItemStyles}>
              <Image {...item} aspectRatio={content.aspect_ratio} masonry={content.masonry}/>
              <div className="mdc-image-list__supporting">
                <span className="mdc-image-list__label">{item.label}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(ImageList)
