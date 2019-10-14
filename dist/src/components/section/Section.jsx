var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Components from 'components';
import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import React from 'react';
import { ThemeProvider } from '@rmwc/theme';
import { section } from '../../utils/themeContentSection';
import SectionWithBackground from './SectionWithBackground';
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper';
var Section = function (_a) {
    var _b;
    var content = _a.content;
    var isFullHeight = !!(content.property && content.property.includes('is_full_height'));
    var containerProps = backgroundPropertyHelper(content.background || []);
    var backgroundImage = containerProps.image;
    var theme = {};
    var variant = content.variant || (content.presetVariant && content.presetVariant.variant);
    // configure some theming variants
    if (variant) {
        var sectionVariant = section[variant];
        if (!sectionVariant) {
            console.info("Theme section variant does not exist: " + variant);
        }
        else {
            theme = sectionVariant;
        }
    }
    var styles = __assign(__assign({}, containerProps.styles), { padding: !isFullHeight && content.padding || '2.5rem 0' });
    var sectionClassNames = clsx('lm-content-section', containerProps.classNames, containerProps.classes, (_b = {},
        _b['lm-section__full-height'] = !!isFullHeight,
        _b));
    var body = content.body || [];
    return (<SbEditable content={content}>
      <ThemeProvider options={theme}>
        {backgroundImage ? (<SectionWithBackground className={sectionClassNames} {...content} containerProps={containerProps} style={styles} isFullHeight={isFullHeight}>
            {body.map(function (blok) { return Components(blok); })}
          </SectionWithBackground>) : (<div className={sectionClassNames} style={styles}>
            {body.map(function (blok) { return Components(blok); })}
          </div>)}
      </ThemeProvider>
    </SbEditable>);
};
export default Section;
