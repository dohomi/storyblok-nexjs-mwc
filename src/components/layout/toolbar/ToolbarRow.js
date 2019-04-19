import SbEditable from 'storyblok-react'
import {TopAppBarRow} from '@rmwc/top-app-bar'
import ToolbarSection from './ToolbarSection'

const ToolbarRow = (props) => {
  const body = props.body || []
  return (
    <SbEditable content={props}>
      <TopAppBarRow>
        {body.map(p => <ToolbarSection {...p} key={p._uid}/>)}
      </TopAppBarRow>
    </SbEditable>
  )
}
export default ToolbarRow
