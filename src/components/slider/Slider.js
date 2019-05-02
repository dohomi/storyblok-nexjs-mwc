import SbEditable from 'storyblok-react'
import Components from 'components/index'
import SwipeableViews from 'react-swipeable-views'
import React, {useState} from 'react'
import clsx from 'clsx'

const chunkArray = (myArray, chunkSize) => {
  const results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }
  return results
}

const Child = ({body}) => {
  return (
    <div>
      {body.map(i => Components(i))}
    </div>
  )
}

const Slider = (props) => {
  const [slide, setSlide] = useState(0)
  const content = props.content
  // const body = content.body
  const body = content.slides_per_view ? chunkArray(content.body.slice(0), content.slides_per_view) : content.body
  const properties = content.property || []
  const styles = {}
  const paginationClasses = clsx(
    'carousel-indicators',
    {'d-none': properties.includes('hide_pagination')}
  )
  const carouselPrevClasses = clsx(
    'carousel-control-prev',
    {'d-none': properties.includes('hide_arrows')}
  )
  const carouselNextClasses = clsx(
    'carousel-control-next',
    {'d-none': properties.includes('hide_arrows')}
  )

  const carouselClasses = clsx(
    'carousel slide', properties.map(i => 'carousel__' + i)
  )

  function handleChangeIndex (item) {
    setSlide(body.findIndex(i => i._uid === item._uid))
  }

  if (content.background_color) {
    styles.backgroundColor = content.background_color && content.background_color.rgba || content.background_color
  }

  return (
    <SbEditable content={content}>
      <div className={carouselClasses} style={styles}>
        <SwipeableViews index={slide}
                        onChangeIndex={(i) => setSlide(i)}>
          {body.map(item => Components(item))}
        </SwipeableViews>
        <a className={carouselPrevClasses}
           role="button"
           onClick={() => setSlide(slide === 0 ? body.length - 1 : slide - 1)}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className={carouselNextClasses}
           role="button"
           onClick={() => setSlide(slide === body.length - 1 ? 0 : slide + 1)}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
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
