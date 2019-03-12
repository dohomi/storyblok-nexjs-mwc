import SbEditable from 'storyblok-react'
import Components from 'components/index'
import SwipeableViews from 'react-swipeable-views'
import React, {useState} from 'react'
import clsx from 'clsx'

const Slider = (props) => {
  const [slide, setSlide] = useState(0)

  const content = props.content
  const body = content.body
  const styles = {}
  const paginationClasses = clsx(
    'carousel-indicators',
    content.pagination_classes
  )

  function handleChangeIndex (item) {
    setSlide(body.findIndex(i => i._uid === item._uid))
  }

  content.background_color && (styles.backgroundColor = content.background_color)
  return (
    <SbEditable content={content}>
      <div className="carousel slide" style={styles}>
        <SwipeableViews index={slide}
                        onChangeIndex={(i) => setSlide(i)}>
          {body.map(item => Components(item))}
        </SwipeableViews>

        <ol className={paginationClasses}>
          {body.map((item, i) => (
            <li className={`${slide === i ? 'active' : ''}`}
                key={item._uid}
                onClick={() => handleChangeIndex(item)}>
            </li>
          ))}
        </ol>
      </div>
    </SbEditable>
  )
}

export default Slider
