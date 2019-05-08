import SbEditable from 'storyblok-react'
import {Card} from '@rmwc/card'
import CardLink from './CardLink'
import Components from 'components/index'


const CardWrap = ({children, content, className, style, outlined}) => {
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink link={content.link}>
          {children}
        </CardLink>
      </Card>
      {body.length > 0 && (
        <div>
          @TODO
          {body.map(blok => Components(blok))}
        </div>
      )}
    </SbEditable>
  )
}

export default CardWrap
