import imageService from './ImageService';
function multipleBackgroundComposer(backgroundElements) {
    var elements = backgroundElements.map(function (item) {
        var url = imageService(item.url || '', '');
        return {
            background: "url('" + url + "') " + (item.horizontal || 'left') + " " + (item.vertical || 'top') + " " + (item.repeat || 'no-repeat'),
            backgroundSize: item.size || 'auto'
        };
    });
    return {
        background: elements.map(function (i) { return i.background; }).join(','),
        backgroundSize: elements.map(function (i) { return i.backgroundSize; }).join(',')
    };
}
var backgroundPropertyHelper = function (properties) {
    var _a;
    if (!Array.isArray(properties)) {
        return {};
    }
    var values = properties[0] || {};
    if (Object.keys(values).length === 0) {
        return {};
    }
    var borderColor = values.border_color && values.border_color.rgba;
    var borderRadius = values.border_radius;
    var border = null;
    if (borderColor) {
        border = (values.border_size || 1) + "px " + (values.border_style || 'solid') + " " + borderColor;
    }
    else if (borderRadius) {
        border = '1px solid transparent';
    }
    var styles = {};
    border && (styles.border = border);
    if (borderRadius) {
        styles.borderRadius = borderRadius;
    }
    if (values.background_color) {
        styles.backgroundColor = values.background_color.rgba;
    }
    if (values.background_elements && values.background_elements.length) {
        Object.assign(styles, multipleBackgroundComposer(values.background_elements));
    }
    return {
        image: values.image,
        styles: styles,
        classNames: values.classNames && values.classNames.values,
        classes: (_a = {},
            _a["mdc-elevation--z" + values.elevation] = !!values.elevation,
            _a),
        imageProperties: values.property || [],
        focalPoint: values.image_focal_point
    };
};
export default backgroundPropertyHelper;
