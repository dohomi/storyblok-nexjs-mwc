import SbEditable from 'storyblok-react'
import {Card, Car} from '@rmwc/card'
import Components from 'components/index'


const PricingItem = (props) => {

  // const img = getImageAttrs({
  //
  // })
  const media = props.image && props.image[0]
  const title = props.title || []
  const price = props.price || []
  const features = props.features || []
  const button = props.button || []
  return (
    <SbEditable content={props}>
      <Card style={{height: '100%'}}>
        {media && <div className="lm-pricing__media">{Components(media)}</div>}
        {title.length > 0 &&
        <div className="lm-pricing__title">{title.map(v => Components(v))}</div>}
        {price.length > 0 && <div className="lm-pricing__price">{price.map(v => Components(v))}</div>}
        {features.length > 0 && <div className="lm-pricing__features"><ul>{features.map(v => {
          return <li key={v._uid}>{Components(v)}</li>
        })}</ul></div>}
        {button.length > 0 && <div className="lm-pricing__action">{button.map(v => Components(v))}</div>}
      </Card>
    </SbEditable>
  )
}

export default PricingItem
