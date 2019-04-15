import {useInView} from 'react-intersection-observer'
import SbEditable from 'storyblok-react'
import SVG from 'react-inlinesvg'

const ImageSvg = ({content}) => {
  const [refIntersectionObserver, inView, el] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })
  const src = inView ? content.source : ''
  const afterSvgLoaded = () => {
    el.target.classList.add('loaded')
    // el.target.style.filter = 'blur(0)'
  }
  const svgStyle = {
    color: content.fit_in_color || 'blue'
  }
  content.width && (svgStyle.width = `${content.width}px`)
  content.height && (svgStyle.height = `${content.height}px`)
  return (
    <SbEditable content={content}>
      <div className="w-100 progressive-img-container"
           ref={refIntersectionObserver}>
        <SVG src={src}
             style={svgStyle}
             onLoad={afterSvgLoaded}
             className="lm-svg-img"/>
      </div>
    </SbEditable>
  )
}

export default ImageSvg
