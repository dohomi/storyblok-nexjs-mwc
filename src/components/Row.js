import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../utils/backgroundPropertyHelper'
import SectionWithBackground from './partials/SectionWithBackground'


const MatRow = ({content}) => {

  /**
   *
   * @type {BackgroundProperty}
   */
  const containerProps = backgroundPropertyHelper(content.background)

  const gridClasses = clsx(
    'mdc-layout-grid',
    {
      [`mdc-layout-grid__cell--align-${content.align || ''}`]: content.align !== undefined,
      'mdc-layout-grid--fixed-column-width': !content.fluid_width
    },
    containerProps.classNames,
    containerProps.classes)
  const styles = {
    ...containerProps.styles
  }
  const innerStyles = {}
  content.grid_gap && (innerStyles.columnGap = `${content.grid_gap}px`)
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <SectionWithBackground style={styles}
                               className={gridClasses}
                               containerProps={containerProps}>
          <div className="mdc-layout-grid__inner" style={innerStyles}>
            {content.body.map((blok) => Components(blok))}
          </div>
        </SectionWithBackground>
      </SbEditable>
    )
  }

  return (
    <SbEditable content={content}>
      <div className={gridClasses}
           style={styles}>
        <div className="mdc-layout-grid__inner" style={innerStyles}>
          {content.body.map((blok) => Components(blok))}
        </div>
      </div>
    </SbEditable>
  )
}
export default MatRow
