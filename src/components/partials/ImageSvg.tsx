import { useInView } from 'react-intersection-observer'
import SbEditable from 'storyblok-react'
import SVG from 'react-inlinesvg'
import { CSSProperties, FunctionComponent } from 'react'
import { ImageStoryblok } from '../../typings/generated/components-schema'


const ImageSvg: FunctionComponent<{ content: ImageStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView, el] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })
  const src = inView ? content.source : ''
  const afterSvgLoaded = () => {
    el.target.classList.add('loaded')
  }
  const onErrorHandler = (error) => {
    console.error(error)
  }
  const fitInColor = (content.color && content.color.rgba) || content.fit_in_color // legacy fit_in_color
  const svgStyle: CSSProperties = {}
  fitInColor && (svgStyle.color = fitInColor)
  content.width && (svgStyle.width = `${content.width}px`)
  content.height && (svgStyle.height = `${content.height}px`)
  console.log('image svg', src)
  return (
    <SbEditable content={content}>
      <div className="w-100 progressive-img-container"
           ref={refIntersectionObserver}>
        <SVG src={src}
             style={svgStyle}
             onLoad={afterSvgLoaded}
             onError={onErrorHandler}
             className="lm-svg-img" />
      </div>
    </SbEditable>
  )
}

export default ImageSvg
