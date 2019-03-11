import SbEditable from 'storyblok-react'
import Components from 'components/index'
import SwipeableViews from 'react-swipeable-views'
import React from 'react'

const Slider = (props) => {
  const content = props.content
  const body = content.body
  let currentIndex = 0

  function handleChangeIndex () {

  }

  return (
    <SbEditable content={content}>
      <SwipeableViews index={currentIndex}
                      onChangeIndex={handleChangeIndex}>
        {body.map(item => Components(item))}
      </SwipeableViews>
    </SbEditable>
  )
}

export default Slider
