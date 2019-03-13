import SbEditable from 'storyblok-react'
import CardListItem from './partials/CardListItem'
import clsx from 'clsx'

const CardList = (props) => {
  const content = props.content
  const body = content.body
  const imageRatio = content.image_ratio || '16x9'
  let gutterSize = content.column_gap || 2
  let columnCount = content.column_count || 5
  let columnCountTablet = content.column_count_tablet || 4
  let columnCountPhone = content.column_count_phone || 1

  const containerClasses = clsx(
    'mdc-image-list',
    {
      'mdc-image-list--masonry': !!content.masonry,
      'mdc-image-list--with-text-protection': !!content.text_protection,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCount}-desktop-${gutterSize}`]: true,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountTablet}-tablet-${gutterSize}`]: true,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountPhone}-phone-${gutterSize}`]: true
    }
  )

  return (
    <SbEditable content={content}>
      <ul className={containerClasses}>
        {body.map(item => (
          <li key={item._uid} className="mdc-image-list__item">
            {CardListItem({
              ...item,
              elevation: content.elevation,
              borderRadius: content.border_radius,
              variant: content.variant,
              titleTag: content.title_tag,
              subtitleTag: content.subtitle_tag,
              titleTypography: content.title_typography,
              subtitleTypography: content.subtitle_typography,
              sixteenByNine: imageRatio === '16x9', // todo
              square: imageRatio === '1x1' // todo
            })}
          </li>
        ))}
      </ul>
    </SbEditable>
  )
}

export default CardList
