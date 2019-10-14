import SbEditable from 'storyblok-react';
import React, { createRef } from 'react';
import Components from 'components';
import clsx from 'clsx';
var PromotionItem = function (props) {
    var _a;
    var container = createRef();
    var body = props.body || [];
    var action = props.action || [];
    var className = clsx('lm-promotion__item', (_a = {},
        _a["lm-promotion__item-" + (props.variant ? props.variant : 'variant')] = true,
        _a["lm-promotion__item-" + props.position] = !!props.position,
        _a));
    return (<SbEditable content={props}>
      <div className={className} ref={container}>
        <div>
          <div className="lm-promotion__content">
            {body.map(function (blok) { return Components(blok); })}
          </div>
          <div className="lm-promotion__action">
            {action.map(function (blok) { return Components(blok); })}
          </div>
        </div>
      </div>
    </SbEditable>);
};
export default PromotionItem;
