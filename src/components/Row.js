import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../utils/backgroundPropertyHelper'
import SectionWithBackground from './partials/SectionWithBackground'

const getThemeStyles = (values) => {
  const styles = {}
  values.forEach((value) => {
    Object.keys(value).forEach(key => {
      if (!value[key]) return
      styles[`--mdc-layout-${key}`] = value[key]
    })
  })
  return styles
}

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
    ...containerProps.styles,
    ...getThemeStyles([{'grid-margin-desktop': content.grid_margin_desktop}, {'grid-margin-tablet': content.grid_margin_tablet}, {'grid-margin-phone': content.grid_margin_phone}, {'grid-gutter-desktop': content.grid_gutter_desktop},
      {'grid-gutter-tablet': content.grid_gutter_tablet}, {'grid-gutter-phone': content.grid_gutter_phone}])
  }
  console.log(styles)
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <SectionWithBackground style={styles}
                               className={gridClasses}
                               containerProps={containerProps}>
          <div className="mdc-layout-grid__inner">
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
        <div className="mdc-layout-grid__inner">
          {content.body.map((blok) => Components(blok))}
        </div>
      </div>
    </SbEditable>
  )
}
export default MatRow
