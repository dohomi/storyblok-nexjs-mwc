import Components from 'components';
import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper';
import SectionWithBackground from './SectionWithBackground';
import * as React from 'react';
var Column = function (_a) {
    var _b;
    var content = _a.content;
    var containerProps = backgroundPropertyHelper(content.background || []);
    var styles = {};
    if (containerProps.styles) {
        styles = containerProps.styles;
    }
    var widthGeneral = content.width_general || 12;
    var widthMobile = content.width_phone || 4;
    var widthTablet = content.width_tablet || widthGeneral;
    var widthDesktop = content.width_desktop || widthGeneral;
    var colClasses = clsx('mdc-layout-grid__cell', (_b = {},
        _b["mdc-layout-grid__cell--align-" + (content.align || '')] = !!content.align,
        _b["mdc-layout-grid__cell--span-" + (widthGeneral || '')] = !widthDesktop,
        _b["mdc-layout-grid__cell--span-" + (widthMobile || '') + "-phone"] = true,
        _b["mdc-layout-grid__cell--span-" + (widthTablet || '') + "-tablet"] = true,
        _b["mdc-layout-grid__cell--span-" + (widthDesktop || '') + "-desktop"] = true,
        _b["mdc-layout-grid__cell--start-" + Number(content.start_desktop || '') + "-desktop"] = !!content.start_desktop,
        _b["mdc-layout-grid__cell--start-" + Number(content.start_tablet || '') + "-tablet"] = !!content.start_tablet,
        _b["mdc-layout-grid__cell--start-" + Number(content.start_phone || '') + "-phone"] = !!content.start_phone,
        _b["mdc-layout-grid__cell--order-" + Number(content.order_desktop || '') + "-desktop"] = !!content.order_desktop,
        _b["mdc-layout-grid__cell--order-" + Number(content.order_tablet || '') + "-tablet"] = !!content.order_tablet,
        _b["mdc-layout-grid__cell--order-" + Number(content.order_phone || '') + "-phone"] = !!content.order_phone,
        _b), containerProps.classNames, containerProps.classes);
    var body = content.body || [];
    if (containerProps.image) {
        return (<SbEditable content={content}>
        <>
          <SectionWithBackground style={styles} isColumn={true} className={colClasses} containerProps={containerProps}>
            {body.map(function (blok) { return Components(blok); })}
          </SectionWithBackground>
        </>
      </SbEditable>);
    }
    return (<SbEditable content={content}>
      <div className={colClasses} style={styles}>
        {body.map(function (blok) { return Components(blok); })}
      </div>
    </SbEditable>);
};
export default Column;
