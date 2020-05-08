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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (_a) {
    var palette = _a.palette, breakpoints = _a.breakpoints;
    var SIZES = {
        xs: 8,
        sm: 10,
        lg: 12
    };
    return {
        root: function (_a) {
            var _b, _c, _d;
            var active = _a.active, color = _a.color;
            var activeColor = color === 'dark' ? palette.text.primary : palette.common.white;
            var inActiveColor = color === 'dark' ? palette.text.disabled : 'rgba(255,255,255,0.38)';
            return _b = {
                    display: 'inline-block',
                    padding: SIZES.xs,
                    lineHeight: 0,
                    cursor: 'pointer'
                },
                _b[breakpoints.up('sm')] = {
                    padding: SIZES.sm
                },
                _b[breakpoints.up('lg')] = {
                    padding: SIZES.lg
                },
                _b['& + .Indicator-root'] = (_c = {
                        marginLeft: SIZES.xs
                    },
                    _c[breakpoints.up('sm')] = {
                        marginLeft: SIZES.sm
                    },
                    _c[breakpoints.up('sm')] = {
                        marginLeft: SIZES.lg
                    },
                    _c),
                _b['&:hover'] = {
                    '&:after': {
                        transform: 'scale(1.2)'
                    }
                },
                _b['&:after'] = (_d = {
                        content: '""',
                        display: 'inline-block',
                        width: SIZES.xs,
                        height: SIZES.xs,
                        borderRadius: '50%',
                        backgroundColor: active
                            ? activeColor
                            : inActiveColor
                    },
                    // transition: transitions.create(),
                    _d[breakpoints.up('sm')] = {
                        width: SIZES.sm,
                        height: SIZES.sm
                    },
                    _d[breakpoints.up('lg')] = {
                        width: SIZES.lg,
                        height: SIZES.lg
                    },
                    _d),
                _b;
        }
    };
});
var InvertedIndicator = function (_a) {
    var className = _a.className, active = _a.active, color = _a.color, props = __rest(_a, ["className", "active", "color"]);
    var classes = useStyles(__assign({ active: active, color: color || 'dark' }, props));
    return (React.createElement("div", __assign({ className: cx(className, 'Indicator-root', 'InvertedIndicator-root', active && '-active', classes.root) }, props)));
};
export default InvertedIndicator;
