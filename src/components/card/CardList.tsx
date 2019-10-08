import SbEditable from 'storyblok-react'
import CardListItem from './CardListItem'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import React, { FunctionComponent, RefObject, useEffect, useState } from 'react'
import { CardListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'

const CardList: FunctionComponent<{ content: CardListStoryblok }> = ({ content }) => {
  const dimensions = useWindowDimensions()
  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px 400px 0px'
  })
  const [mediaDimension, setMediaDimension] = useState({ width: 0, height: 0 })

  const cardRef: RefObject<HTMLUListElement> = React.createRef()
  const body = content.body || []
  const imageRatio = content.image_ratio || '16x9'
  let gutterSize = content.column_gap || 2
  let columnCount = content.column_count || 5
  let columnCountTablet = content.column_count_tablet || 4
  let columnCountPhone = content.column_count_phone || 1

  useEffect(() => {
    if (inView) {
      if (!intersectionElement) {
        return
      }

      const current = cardRef.current
      const mediaContainer = current && current.querySelector('.mdc-card__media')
      if (mediaContainer) {
        setMediaDimension({
          width: mediaContainer.clientWidth,
          height: mediaContainer.clientHeight
        })
      }
    }
  }, [inView, dimensions])

  const containerClasses = clsx(
    'mdc-image-list',
    {
      [`lm-image-list__column-${columnCount}-desktop-${gutterSize}`]: true,
      [`lm-image-list__column-${columnCountTablet}-tablet-${gutterSize}`]: true,
      [`lm-image-list__column-${columnCountPhone}-phone-${gutterSize}`]: true
    }
  )

  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <ul className={containerClasses} ref={cardRef}>
          {body.map(item => (
            <li key={item._uid} className="mdc-image-list__item">
              {CardListItem({
                ...item,
                inView,
                mediaDimension,
                image_size: content.image_size,
                elevation: content.elevation,
                border_radius: content.border_radius,
                variant: content.variant,
                title_tag: content.title_tag,
                titleClassName: content.title_class_name && content.title_class_name.values,
                subtitleClassName: content.subtitle_class_name && content.subtitle_class_name.values,
                descriptionClassName: content.description_class_name && content.description_class_name.values,
                subtitle_tag: content.subtitle_tag,
                title_typography: content.title_typography,
                subtitle_typography: content.subtitle_typography,
                description_typography: content.description_typography,
                sixteenByNine: imageRatio === '16x9', // todo
                square: imageRatio === '1x1' // todo
              })}
            </li>
          ))}
        </ul>
      </div>
    </SbEditable>
  )
}

export default CardList
