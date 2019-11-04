import SbEditable from 'storyblok-react'
import Components from '@components'
import SwipeableViews from 'react-swipeable-views'
import React, { CSSProperties, FunctionComponent, memo, useState } from 'react'
import clsx from 'clsx'
import { SliderStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { SectionProps } from '../section/Section'
import SliderChild from './SliderChild'
import { makeStyles } from '@material-ui/core/styles'
import InvertedIndicator from './InvertedIndicator'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const chunkArray = (myArray: Element[], chunkSize: number) => {
  const results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }
  return results
}

export const useStyles = makeStyles({
  carousel: {
    position: 'relative',
    '&.carousel__arrows_dark': {
      '& .MuiIcon-root': {
        color: 'rgba(0,0,0,0.8)'
      }
    },
    '& .carousel-indicators': {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center'
    },
    '& .carousel-control-next, & .carousel-control-prev': {
      position: 'absolute',
      height: '100%',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& .MuiIcon-root': {
        fontSize: '4rem',
        color: 'rgba(255,255,255,0.8)'
      }
    },
    '& .carousel-control-next': {
      right: 0
    }
  }
})


const Slider: FunctionComponent<{ content: SliderStoryblok }> = ({ content }) => {
  const [slide, setSlide] = useState(0)
  const dimensions = useWindowDimensions()
  const classes = useStyles()
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
  console.log(content.property)
  const carouselClasses = clsx(
    classes.carousel, 'carousel slide', properties.map(i => 'carousel__' + i)
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
            return <SliderChild key={`swipeable_${index}`} body={child} sectionVariant={content.section_variant} />
          }) : body.map(item => {
            if (item.component === 'section') {
              let newOpts: SectionProps = {
                ...item,
                presetVariant: content.section_variant || 'transparent'
              }
              return Components(newOpts)
            }
            return Components(item)
          })}
        </SwipeableViews>
        <a className={carouselPrevClasses}
           role="button"
           onClick={() => setSlide(slide === 0 ? body.length - 1 : slide - 1)}>
          <Icon>keyboard_arrow_left</Icon>
          <Typography variant={'srOnly'}>Previous</Typography>
        </a>
        <a className={carouselNextClasses}
           role="button"
           onClick={() => setSlide(slide === body.length - 1 ? 0 : slide + 1)}>
          <Icon>keyboard_arrow_right</Icon>
          <Typography variant={'srOnly'}>Next</Typography>
        </a>
        <div className={paginationClasses}>
          {body.map((item, i) => (
            <InvertedIndicator key={item._uid || `pagination_${i}`}
                               active={slide === i}
                               color={properties.includes('pagination_dark') ? 'dark' : 'light'}
                               onClick={() => handleChangeIndex(item)}>
            </InvertedIndicator>
          ))}
        </div>
      </div>
    </SbEditable>
  )
}

export default memo<{ content: SliderStoryblok }>(Slider)
