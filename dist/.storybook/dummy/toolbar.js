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
var menuItem = {
    _uid: '1231231',
    component: 'nav_menu',
    border_radius: 0,
    title: 'Menu',
    body: [{
            _uid: '3243',
            component: 'nav_menu_item',
            label: 'First'
        }, {
            _uid: '34234242',
            component: 'nav_menu_item',
            label: 'Second'
        }]
};
var toolbarItems = [{
        _uid: '123',
        component: 'button',
        label: 'Button'
    }, {
        _uid: '12321',
        component: 'button',
        label: 'Another Button'
    }, menuItem];
export var simpleSettings = {
    _uid: '123',
    component: 'global',
    theme_base: 'base',
    website_title: 'Storybook Website Title',
    toolbar: toolbarItems
};
var multiToolbar = [{
        _uid: '23',
        component: 'toolbar_row',
        body: [{
                _uid: '123',
                component: 'toolbar_row_section',
                align_end: true,
                body: toolbarItems
            }]
    }];
export var customSettings = __assign(__assign({}, simpleSettings), { multi_toolbar: multiToolbar });
