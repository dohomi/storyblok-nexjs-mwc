import SbEditable from 'storyblok-react'
import React from 'react'
import Image from '../partials/Image'
import PromotionItem from './PromotionItem'
import withWindowDimensions from '../provider/WithWindowDimensions'

const Promotion = ({content, dimensions}) => {
  const image = content.image && content.image[0]
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div className="lm-promotion">
        <Image content={image}/>
        {body.map(blok => <PromotionItem {...blok} dimensions={dimensions} key={blok._uid}/>)}
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Promotion)
