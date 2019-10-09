import Components from 'components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper'
import SectionWithBackground from './SectionWithBackground'
import { RowNestedStoryblok, RowStoryblok } from '../../typings/generated/components-schema'
import { CSSProperties, FunctionComponent } from 'react'


/**
 *
 * @param values
 */
const getThemeStyles = (values: any[]) => {
  const styles: any = {}
  values.forEach((value) => {
    Object.keys(value).forEach(key => {
      if (!value[key]) return
      styles[`--mdc-layout-${key}`] = value[key]
    })
  })
  return styles
}


const getRowProperties = (content: RowNestedStoryblok | RowStoryblok) => {
  // content = content || {}

  const containerProps = backgroundPropertyHelper(content.background)

  const styles: CSSProperties = {
    ...containerProps.styles,
    ...getThemeStyles([
      { 'grid-margin-desktop': content.grid_margin_desktop },
      { 'grid-margin-tablet': content.grid_margin_tablet },
      { 'grid-margin-phone': content.grid_margin_phone },
      { 'grid-gutter-desktop': content.grid_gutter_desktop },
      { 'grid-gutter-tablet': content.grid_gutter_tablet },
      { 'grid-gutter-phone': content.grid_gutter_phone }])
  }

  return {
    containerProps,
    styles
  }
}

export const MatRow: FunctionComponent<{ content: RowStoryblok }> = ({ content }) => {
  const { styles, containerProps } = getRowProperties(content)
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
  const innerStyles: CSSProperties = {}
  if (content.column_gap) {
    innerStyles.columnGap = `${content.column_gap}px`
  }
  if (content.grid_gap) {
    // innerStyles.gridGap = `${content.grid_gap}px`
    innerStyles.rowGap = `${content.grid_gap}px`
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

export const MatRowNested: FunctionComponent<{ content: RowNestedStoryblok }> = ({ content }) => {
  const { styles, containerProps } = getRowProperties(content)
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
  if (content.grid_gap) {
    styles.rowGap = `${content.grid_gap}px`
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

