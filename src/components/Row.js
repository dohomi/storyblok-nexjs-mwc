import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../utils/backgroundPropertyHelper'
import SectionWithBackground from './partials/SectionWithBackground'

/**
 *
 * @param values
 */
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

/**
 *
 * @param content
 * @return {{containerProps: BackgroundProperty, styles: {border: string, backgroundColor: string, borderRadius: string}}}
 */
const getRowProperties = (content = {}) => {
  content = content || {}

  /**
   *
   * @type {BackgroundProperty}
   */
  const containerProps = backgroundPropertyHelper(content.background)

  const styles = {
    ...containerProps.styles,
    ...getThemeStyles([
      {'grid-margin-desktop': content.grid_margin_desktop},
      {'grid-margin-tablet': content.grid_margin_tablet},
      {'grid-margin-phone': content.grid_margin_phone},
      {'grid-gutter-desktop': content.grid_gutter_desktop},
      {'grid-gutter-tablet': content.grid_gutter_tablet},
      {'grid-gutter-phone': content.grid_gutter_phone}])
  }
  return {
    containerProps,
    styles
  }
}

export const MatRow = ({content}) => {
  const {styles, containerProps} = getRowProperties(content)
  const gridClasses = clsx(
    'mdc-layout-grid',
    {
      [`mdc-layout-grid__cell--align-${content.align || ''}`]: !!content.align,
      'mdc-layout-grid--fixed-column-width': !content.fluid_width
    },
    containerProps.classNames,
    containerProps.classes)
  const body = content.body || []
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <SectionWithBackground style={styles}
                               className={gridClasses}
                               containerProps={containerProps}>
          <div className="mdc-layout-grid__inner">
            {body.map((blok) => Components(blok))}
          </div>
        </SectionWithBackground>
      </SbEditable>
    )
  }
  const innerStyles = {}
  if (content.column_gap) {
    innerStyles.columnGap = `${content.column_gap}px`
  }

  return (
    <SbEditable content={content}>
      <div className={gridClasses}
           style={styles}>
        <div className="mdc-layout-grid__inner"
             style={innerStyles}>
          {body.map((blok) => Components(blok))}
        </div>
      </div>
    </SbEditable>
  )
}

export const MatRowNested = ({content}) => {
  const {styles, containerProps} = getRowProperties(content)
  const classes = clsx(
    'mdc-layout-grid__inner',
    containerProps.classNames,
    containerProps.classes)
  const body = content.body || []
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <SectionWithBackground style={styles}
                               className={classes}
                               containerProps={containerProps}>
          {body.map((blok) => Components(blok))}
        </SectionWithBackground>
      </SbEditable>
    )
  }
  if (content.column_gap) {
    styles.columnGap = `${content.column_gap}px`
  }

  return (
    <SbEditable content={content}>
      <div className={classes}
           style={styles}>
        {body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

