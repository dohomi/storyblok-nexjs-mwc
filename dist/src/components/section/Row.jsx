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
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper';
import SectionWithBackground from './SectionWithBackground';
/**
 *
 * @param values
 */
var getThemeStyles = function (values) {
    var styles = {};
    values.forEach(function (value) {
        Object.keys(value).forEach(function (key) {
            if (!value[key])
                return;
            styles["--mdc-layout-" + key] = value[key];
        });
    });
    return styles;
};
var getRowProperties = function (content) {
    // content = content || {}
    var containerProps = backgroundPropertyHelper(content.background || []);
    var styles = __assign(__assign({}, containerProps.styles), getThemeStyles([
        { 'grid-margin-desktop': content.grid_margin_desktop },
        { 'grid-margin-tablet': content.grid_margin_tablet },
        { 'grid-margin-phone': content.grid_margin_phone },
        { 'grid-gutter-desktop': content.grid_gutter_desktop },
        { 'grid-gutter-tablet': content.grid_gutter_tablet },
        { 'grid-gutter-phone': content.grid_gutter_phone }
    ]));
    return {
        containerProps: containerProps,
        styles: styles
    };
};
export var MatRow = function (_a) {
    var _b;
    var content = _a.content;
    var _c = getRowProperties(content), styles = _c.styles, containerProps = _c.containerProps;
    var gridClasses = clsx('mdc-layout-grid', (_b = {},
        _b["mdc-layout-grid__cell--align-" + (content.align || '')] = !!content.align,
        _b['mdc-layout-grid--fixed-column-width'] = !content.fluid_width,
        _b), containerProps.classNames, containerProps.classes);
    var body = content.body || [];
    if (containerProps.image) {
        return (<SbEditable content={content}>
        <SectionWithBackground style={styles} className={gridClasses} containerProps={containerProps}>
          <div className="mdc-layout-grid__inner">
            {body.map(function (blok) { return Components(blok); })}
          </div>
        </SectionWithBackground>
      </SbEditable>);
    }
    var innerStyles = {};
    if (content.column_gap) {
        innerStyles.columnGap = content.column_gap + "px";
    }
    if (content.grid_gap) {
        // innerStyles.gridGap = `${content.grid_gap}px`
        innerStyles.rowGap = content.grid_gap + "px";
    }
    return (<SbEditable content={content}>
      <div className={gridClasses} style={styles}>
        <div className="mdc-layout-grid__inner" style={innerStyles}>
          {body.map(function (blok) { return Components(blok); })}
        </div>
      </div>
    </SbEditable>);
};
export var MatRowNested = function (_a) {
    var content = _a.content;
    var _b = getRowProperties(content), styles = _b.styles, containerProps = _b.containerProps;
    var classes = clsx('mdc-layout-grid__inner', containerProps.classNames, containerProps.classes);
    var body = content.body || [];
    if (containerProps.image) {
        return (<SbEditable content={content}>
        <SectionWithBackground style={styles} className={classes} containerProps={containerProps}>
          {body.map(function (blok) { return Components(blok); })}
        </SectionWithBackground>
      </SbEditable>);
    }
    if (content.column_gap) {
        styles.columnGap = content.column_gap + "px";
    }
    if (content.grid_gap) {
        styles.rowGap = content.grid_gap + "px";
    }
    return (<SbEditable content={content}>
      <div className={classes} style={styles}>
        {body.map(function (blok) { return Components(blok); })}
      </div>
    </SbEditable>);
};
