import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import PricingItem from './PricingItem'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {createRef, useEffect} from 'react'

const equalizeHeights = (querySelectorAll) => {
  if (querySelectorAll.length) {
    const heights = []
    querySelectorAll.forEach(container => {
      heights.push(container.clientHeight)
    })
    const max = Math.max(...heights)
    querySelectorAll.forEach(container => {
      container.style.minHeight = `${max}px`
    })
  }
}

const Pricing = ({content, dimensions}) => {
  const containerRef = createRef()
  let gutterSize = content.column_gap || 2
  const body = content.body || []
  let columnCount = content.column_count || body.length
  let columnCountTablet = content.column_count_tablet || columnCount
  let columnCountPhone = content.column_count_phone || 1

  const containerClasses = clsx(
    'mdc-image-list lm-pricing',
    {
      [`lm-image-list__column-${columnCount}-desktop-${gutterSize}`]: true,
      [`lm-image-list__column-${columnCountTablet}-tablet-${gutterSize}`]: true,
      [`lm-image-list__column-${columnCountPhone}-phone-${gutterSize}`]: true
    }
  )

  useEffect(
    () => {
      equalizeHeights(containerRef.current.querySelectorAll('.lm-pricing__title'))
    },
    [dimensions]
  )


  return (
    <SbEditable content={content}>
      <ul className={containerClasses} ref={containerRef}>
        {body.map(item => {
          return (
            <li key={item._uid} className="mdc-image-list__item">
              {PricingItem(item)}
            </li>
          )
        })}
      </ul>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Pricing)