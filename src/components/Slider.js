import SbEditable from 'storyblok-react'
import Components from 'components/index'
import SwipeableViews from 'react-swipeable-views'
import React, {useState} from 'react'
import clsx from 'clsx'

const Slider = (props) => {
  const [slide, setSlide] = useState(0)

  const content = props.content
  const body = content.body

  const paginationClasses = clsx(
    'lm-pagination',
    content.pagination_classes
  )

  function handleChangeIndex (item) {
    console.log(item)
    setSlide(body.findIndex(i => i._uid === item._uid))
  }

  return (
    <SbEditable content={content}>
      <div className="lm-content-slider">
        <SwipeableViews index={slide}
                        onChangeIndex={handleChangeIndex}>
          {body.map(item => Components(item))}
        </SwipeableViews>

        <ol className={paginationClasses}>
          {body.map((item, index) => (
            <li key={item._uid}
                className="material-icons"
                onClick={() => handleChangeIndex(item)}>{slide === index ? 'radio_button_checked' : 'radio_button_unchecked'}</li>
          ))}
        </ol>
      </div>
    </SbEditable>
  )
}

export default Slider
