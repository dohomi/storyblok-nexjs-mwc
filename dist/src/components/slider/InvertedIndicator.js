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
const useStyles = makeStyles(({ palette, breakpoints }) => {
    const SIZES = {
        xs: 8,
        sm: 10,
        lg: 12
    };
    return {
        root: ({ active, color }) => {
            const activeColor = color === 'dark' ? palette.text.primary : palette.common.white;
            const inActiveColor = color === 'dark' ? palette.text.disabled : 'rgba(255,255,255,0.38)';
            return {
                display: 'inline-block',
                padding: SIZES.xs,
                lineHeight: 0,
                cursor: 'pointer',
                [breakpoints.up('sm')]: {
                    padding: SIZES.sm
                },
                [breakpoints.up('lg')]: {
                    padding: SIZES.lg
                },
                '& + .Indicator-root': {
                    marginLeft: SIZES.xs,
                    [breakpoints.up('sm')]: {
                        marginLeft: SIZES.sm
                    },
                    [breakpoints.up('sm')]: {
                        marginLeft: SIZES.lg
                    }
                },
                '&:hover': {
                    '&:after': {
                        transform: 'scale(1.2)'
                    }
                },
                '&:after': {
                    content: '""',
                    display: 'inline-block',
                    width: SIZES.xs,
                    height: SIZES.xs,
                    borderRadius: '50%',
                    backgroundColor: active
                        ? activeColor
                        : inActiveColor,
                    // transition: transitions.create(),
                    [breakpoints.up('sm')]: {
                        width: SIZES.sm,
                        height: SIZES.sm
                    },
                    [breakpoints.up('lg')]: {
                        width: SIZES.lg,
                        height: SIZES.lg
                    }
                }
            };
        }
    };
});
const InvertedIndicator = (_a) => {
    var { className, active, color } = _a, props = __rest(_a, ["className", "active", "color"]);
    const classes = useStyles(Object.assign({ active, color: color || 'dark' }, props));
    return (React.createElement("div", Object.assign({ className: cx(className, 'Indicator-root', 'InvertedIndicator-root', active && '-active', classes.root) }, props)));
};
export default InvertedIndicator;
