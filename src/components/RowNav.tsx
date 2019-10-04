import Components from 'components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'


const Row = (props) => {
  const navClasses = clsx({
    'navbar': true,
    'no-gutters': true,
    'navbar-expand-md': true // let nav items be side by side.. make configurable
  }, props.content.style)
  return (
    <SbEditable content={props.content}>
      <nav className={navClasses}>
        {props.content.body.map((blok) =>
          Components(blok)
        )}
      </nav>
    </SbEditable>
  )
}

export default Row
