import SbEditable from 'storyblok-react'
import {Card} from '@rmwc/card'
import CardLink from './CardLink'

const CardWrap = ({children, content, className, style, outlined}) => {
  return (
    <SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink link={content.link}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>
  )
}

export default CardWrap
