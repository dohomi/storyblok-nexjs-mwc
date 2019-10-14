import SbEditable from 'storyblok-react';
import clsx from 'clsx';
var Wrap = function (_a) {
    var content = _a.content, children = _a.children, style = _a.style, className = _a.className, childStyle = _a.childStyle;
    return (<SbEditable content={content}>
    <div className={className} style={style}>
      <div style={childStyle}>{children}</div>
    </div>
  </SbEditable>);
};
var Divider = function (_a) {
    var content = _a.content;
    var style = {};
    var iconName = content.icon && content.icon.name;
    var iconSize = content.icon_size;
    if (content.color && content.color.rgba) {
        style.color = content.color.rgba;
    }
    if (iconSize) {
        style.height = iconSize + "px";
    }
    var className = clsx('h-separator', content.class_names && content.class_names.values, {
        divider: !iconName,
        'h-separator-icon': iconName
    });
    var childStyle = {
        borderTopWidth: (content.thickness || 1) + "px"
    };
    if (content.width) {
        childStyle.width = content.width + "%";
    }
    if (iconName) {
        var iconClasses = clsx('material-icons', 'rmwc-icon');
        var iconStyle = {
            marginTop: (content.thickness || 1) + "px"
        };
        if (iconSize) {
            iconStyle.fontSize = iconSize + "px";
        }
        return (<Wrap content={content} style={style} childStyle={childStyle} className={className}>
        <div>
          <div style={{ borderTopWidth: (content.thickness || 1) + "px" }}>
            <span>
              <i className={iconClasses} style={iconStyle}>{iconName}</i>
            </span>
          </div>
        </div>
      </Wrap>);
    }
    return (<Wrap content={content} style={style} childStyle={childStyle} className={className}>
      <span />
    </Wrap>);
};
export default Divider;
