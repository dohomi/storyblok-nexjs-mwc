import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import backgroundPropertyHelper from '../utils/backgroundPropertyHelper'
import SectionWithBackground from './Row'

const MatRow = ({content}) => {
  /**
   *
   * @type {BackgroundProperty}
   */
  const containerProps = backgroundPropertyHelper(content.background)
  const classes = clsx(
    'mdc-layout-grid__inner',
    containerProps.classNames,
    containerProps.classes)
  const styles = {
    ...containerProps.styles
  }
  content.grid_gap && (styles.columnGap = `${content.grid_gap}px`)
  if (containerProps.image) {
    return (
      <SbEditable content={content}>
        <SectionWithBackground style={styles}
                               className={classes}
                               containerProps={containerProps}>
            {content.body.map((blok) => Components(blok))}
        </SectionWithBackground>
      </SbEditable>
    )
  }

  return (
    <SbEditable content={content}>
      <div className={classes}
           style={styles}>
        {content.body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default MatRow
