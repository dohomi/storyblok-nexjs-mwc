import SbEditable from 'storyblok-react'
import CardListItem from './CardListItem'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { CardListStoryblok } from '../../typings/generated/components-schema'

const CardList: FunctionComponent<{ content: CardListStoryblok }> = ({ content }) => {
  const { body, column_gap, column_count, column_count_phone, column_count_tablet, ...rest } = content
  const items = body || []
  let gutterSize = column_gap || 2
  let columnCount = column_count || 5
  let columnCountTablet = column_count_tablet || 4
  let columnCountPhone = column_count_phone || 1

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
      <div>
        <ul className={containerClasses}>
          {items.map(item => (
            <li key={item._uid} className="mdc-image-list__item">
              <CardListItem content={item} options={rest} />
            </li>
          ))}
        </ul>
      </div>
    </SbEditable>
  )
}

export default CardList
