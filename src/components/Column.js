import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

import {GridCell} from '@rmwc/grid'

const Column = (props) => {
  // const width = props.content && props.content.width || {}
  const content = props.content
  const additionalClasses = []
  const styles = {}
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }

  content.start_desktop && additionalClasses.push(`mdc-layout-grid__cell--start-${Number(content.start_desktop)}-desktop`)
  content.start_tablet && additionalClasses.push(`mdc-layout-grid__cell--start-${Number(content.start_tablet)}-tablet`)
  content.start_phone && additionalClasses.push(`mdc-layout-grid__cell--start-${Number(content.start_phone)}-phone`)

  const colClasses = clsx(props.content.style, props.content.style_props, additionalClasses)
  return (
    <SbEditable content={props.content}>
      <GridCell className={colClasses}
                span={content.width_general}
                phone={content.width_mobile}
                tablet={content.width_tablet}
                desktop={content.width_desktop}
                order={content.order}
                align={content.align}
                style={styles}>
        {props.content.body.map((blok) =>
          Components(blok)
        )}
      </GridCell>
    </SbEditable>
  )
}

export default Column
