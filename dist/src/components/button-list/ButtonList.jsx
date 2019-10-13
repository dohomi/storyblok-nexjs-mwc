import SbEditable from 'storyblok-react';
import Components from 'components';
import clsx from 'clsx';
var ButtonList = function (_a) {
    var content = _a.content;
    var body = content.body || [];
    var properties = content.property || [];
    var classNames = clsx('d-flex', content.class_names && content.class_names.values, {
        'lm-button-list__margin-left': properties.includes('margin_left')
    });
    return (<SbEditable content={content}>
      <div className={classNames}>
        {body.map(function (i) { return Components(i); })}
      </div>
    </SbEditable>);
};
export default ButtonList;
