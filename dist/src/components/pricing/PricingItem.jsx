import SbEditable from 'storyblok-react';
import { Card } from '@rmwc/card';
import Components from 'components';
var PricingItem = function (props) {
    var media = props.image && props.image[0];
    var title = props.title || [];
    var price = props.price || [];
    var promotion = props.promotion || [];
    var features = props.features || [];
    var subtitle = props.subtitle || [];
    var button = props.button || [];
    return (<SbEditable content={props}>
      <Card style={{ height: '100%' }}>
        {media && <div className="lm-pricing__media">{Components(media)}</div>}
        <div className={"lm-pricing__title" + (!title.length ? ' lm-no-title' : '')}>{title.map(function (v) { return Components(v); })}</div>
        {price.length > 0 && (<div className="lm-pricing__price">
            {promotion.length > 0 && promotion.map(function (v) { return Components(v); })}
            {price.map(function (v) { return Components(v); })}
          </div>)}
        {subtitle.length > 0 && <div className="lm-pricing__subtitle">{subtitle.map(function (v) { return Components(v); })}</div>}
        {features.length > 0 && <div className="lm-pricing__features">
          <ul>{features.map(function (v) {
        return <li key={v._uid}>{Components(v)}</li>;
    })}</ul>
        </div>}
        {button.length > 0 && <div className="lm-pricing__action">{button.map(function (v) { return Components(v); })}</div>}
      </Card>
    </SbEditable>);
};
export default PricingItem;
