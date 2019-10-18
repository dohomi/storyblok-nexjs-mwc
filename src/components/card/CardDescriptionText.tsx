import { default as React, FunctionComponent } from 'react'
import { Typography } from '@rmwc/typography'
import { CardListItemProps } from './cards'
import clsx from 'clsx'

const CardDescriptionText: FunctionComponent<CardListItemProps> = ({ content, options }) => {
  let description = content.description
  const descriptionMaxCharacter = options.description_max_character
  if (!description || descriptionMaxCharacter === 0) {
    return null
  }
  if (descriptionMaxCharacter && description.length > descriptionMaxCharacter) {
    description = description.substr(0, descriptionMaxCharacter) + '..'
  }
  return <Typography tag="p"
                     use={options.description_typography || 'body1'}
                     className={clsx(options.description_class_name && options.description_class_name.values)}>{description}</Typography>
}

export default CardDescriptionText
