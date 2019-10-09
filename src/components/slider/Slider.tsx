import SbEditable from 'storyblok-react'
import Components from 'components'
import SwipeableViews from 'react-swipeable-views'
import React, { CSSProperties, FunctionComponent, memo, useState } from 'react'
import clsx from 'clsx'
import { SliderStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { SectionProps } from '../section/Section'

const chunkArray = (myArray: Element[], chunkSize: number) => {
  const results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }
  return results
}

const Child: FunctionComponent<{ body: any[], sectionVariant: any }> = ({ body, sectionVariant }) => {
  return (
    <div className="d-flex h-100 lm-slider__container flex-row justify-content-center">
      {body.map(item => {
        if (item.component === 'section') {
          let newOpts: SectionProps = {
            ...item,
            presetVariant: {
              variant: sectionVariant || 'transparent'
            }
          }
          return Components(newOpts)
        }
        return <div key={`child_${item._uid}`} className="flex-grow-1">{Components(item)}</div>
      })}
    </div>
  )
}

const Slider: FunctionComponent<{ content: SliderStoryblok }> = ({ content }) => {
  const [slide, setSlide] = useState(0)
  const dimensions = useWindowDimensions()
  const wrapInColumns = content.slides_per_view && !dimensions.isMobile
  const contentBody = content.body || []
  const body = wrapInColumns ? chunkArray(contentBody.slice(0), content.slides_per_view as number) : contentBody
  const properties = content.property || []
  const styles: CSSProperties = {}
  const paginationClasses = clsx(
    'carousel-indicators',
    { 'd-none': properties.includes('hide_pagination') }
  )
  const carouselPrevClasses = clsx(
    'carousel-control-prev',
    { 'd-none': properties.includes('hide_arrows') }
  )
  const carouselNextClasses = clsx(
    'carousel-control-next',
    { 'd-none': properties.includes('hide_arrows') }
  )

  const carouselClasses = clsx(
    'carousel slide', properties.map(i => 'carousel__' + i)
  )

  function handleChangeIndex(item: any) {
    setSlide(body.findIndex(i => i._uid === item._uid))
  }

  if (content.background_color) {
    styles.backgroundColor = content.background_color && content.background_color.rgba
  }

  return (
    <SbEditable content={content}>
      <div className={carouselClasses} style={styles}>
        <SwipeableViews index={slide}
                        onChangeIndex={(i) => setSlide(i)}>
          {wrapInColumns ? body.map((child, index) => {
            return <Child key={`swipeable_${index}`} body={child} sectionVariant={content.section_variant} />
          }) : body.map(item => {
            if (item.component === 'section') {
              let newOpts: SectionProps = {
                ...item,
                presetVariant: {
                  variant: content.section_variant || 'transparent'
                }
              }
              return Components(newOpts)
            }
            return Components(item)
          })}
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
                key={item._uid || `pagination_${i}`}
                onClick={() => handleChangeIndex(item)}>
            </li>
          ))}
        </ol>
      </div>
    </SbEditable>
  )
}

export default memo<{ content: SliderStoryblok }>(Slider)
