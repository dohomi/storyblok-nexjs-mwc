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
import React, { createRef, useEffect, useState } from 'react';
import { createStyles, fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, useMediaQuery } from '@material-ui/core';
import { getLinkAttrs } from '../../utils/linkHandler';
import MuiNextLink from '../link/MuiNextLink';
import LmIcon from '../icon/LmIcon';
import { Magnify } from 'mdi-material-ui';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SbEditable from 'storyblok-react';
import { useDebouncedCallback } from 'use-debounce';
import StoryblokService from '../../utils/StoryblokService';
import InputAdornment from '@material-ui/core/InputAdornment';
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: {
            display: 'inline-flex',
            verticalAlign: 'middle',
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'inherit'
            }
        },
        mobile: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 1,
            height: '100%',
            verticalAlign: 'middle',
            backgroundColor: 'inherit',
            '& .MuiFormControl-root': {
                alignSelf: 'center'
            }
        },
        inputRoot: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade('rgba(0,0,0,.05)', 0.15),
            color: 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.action.focus
            },
            '&:hover': {
                backgroundColor: fade('rgba(0,0,0,.05)', 0.25),
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.action.focus
                }
            }
        },
        borderSquare: {
            borderRadius: 0,
            '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 0
            }
        },
        borderRounded: {
            borderRadius: '25px',
            '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '25px'
            }
        },
        inputDefaultWidth: {
            color: 'inherit',
            transition: theme.transitions.create('width')
        },
        variableWidth: {
            '&.MuiAutocomplete-input': (_a = {},
                _a[theme.breakpoints.up('sm')] = {
                    width: 120,
                    '&:focus,&:active': {
                        width: 200
                    }
                },
                _a)
        },
        listbox: {
            '& .MuiLink-root': {
                display: 'block',
                width: '100%',
                color: 'inherit',
                '&:hover': {
                    textDecoration: 'none'
                }
            }
        }
    });
});
var ListSearchAutocompleteWrap = function (_a) {
    var content = _a.content, children = _a.children, popperActive = _a.popperActive, inputRef = _a.inputRef, isMobileAction = _a.isMobileAction;
    var _b;
    var _c = useState(false), visible = _c[0], setVisible = _c[1];
    var classes = useStyles();
    var _d = useState(), bgColor = _d[0], setBgColor = _d[1];
    useEffect(function () {
        var _a;
        if (isMobileAction) {
            var toolbar_1 = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.closest('.MuiAppBar-root');
            var bg = toolbar_1 && window.getComputedStyle(toolbar_1, null).backgroundColor;
            setBgColor(bg ? bg : undefined);
        }
    }, [isMobileAction, inputRef]);
    useEffect(function () {
        var _a;
        if (!isMobileAction) {
            return;
        }
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [visible, inputRef, isMobileAction]);
    useEffect(function () {
        if (!isMobileAction) {
            return;
        }
        if (!popperActive) {
            setVisible(false);
        }
    }, [popperActive, isMobileAction]);
    var onOpen = function () {
        setVisible(true);
    };
    if (isMobileAction) {
        return (React.createElement(SbEditable, { content: content },
            !visible && (React.createElement(IconButton, { onClick: onOpen }, ((_b = content.icon) === null || _b === void 0 ? void 0 : _b.name) ? React.createElement(LmIcon, { iconName: content.icon.name }) :
                React.createElement(Magnify, null))),
            React.createElement("div", { style: {
                    display: !visible ? 'none' : 'inline-flex',
                    backgroundColor: bgColor
                }, className: classes.mobile }, children)));
    }
    return React.createElement(SbEditable, { content: content }, children);
};
var ListSearchAutocomplete = function (_a) {
    var _b, _c;
    var content = _a.content;
    // const { allStories } = useAppContext()
    var _d = useState([]), allStories = _d[0], setAllStories = _d[1];
    var classes = useStyles();
    var inputRef = createRef();
    var _e = useState(), open = _e[0], setOpen = _e[1];
    var theme = useTheme();
    var matches = useMediaQuery(theme.breakpoints.down(content.mobile_breakpoint || 'xs'));
    var isMobileAction = content.mobile_breakpoint && matches;
    var debounceFunc = useDebouncedCallback(function (value) {
        if (value.length < 2) {
            return;
        }
        setOpen(true);
        StoryblokService.getSearch("cdn/stories", {
            per_page: 25,
            sort_by: 'content.preview_title:desc',
            excluding_fields: 'body,right_body,meta_robots,property,seo_body',
            search_term: value,
            filter_query: {
                'component': {
                    'in': 'page'
                }
            }
        }).then(function (res) {
            console.log("in then", res.data.stories);
            setAllStories(res.data.stories);
            setOpen(true);
            // setSearchText(value)
        });
    }, 400)[0];
    return (React.createElement(ListSearchAutocompleteWrap, { content: content, popperActive: open, inputRef: inputRef, isMobileAction: !!isMobileAction },
        React.createElement(Autocomplete, { onOpen: function () { return setOpen(true); }, onClose: function () { return setOpen(false); }, style: { width: isMobileAction ? '100%' : undefined }, options: allStories.map(function (option) {
                var _a, _b;
                return ({
                    uuid: option.uuid,
                    full_slug: option.full_slug,
                    label: ((_a = option.content) === null || _a === void 0 ? void 0 : _a.preview_title) || ((_b = option.content) === null || _b === void 0 ? void 0 : _b.meta_title) || option.name || ''
                });
            }).sort(function (a, b) { return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0); }), freeSolo: true, classes: {
                root: classes.root,
                listbox: classes.listbox,
                inputRoot: clsx(classes.inputRoot, (_b = {},
                    _b[classes.borderSquare] = content.shape === 'square',
                    _b[classes.borderRounded] = content.shape === 'rounded',
                    _b)),
                input: clsx(classes.inputDefaultWidth, (_c = {},
                    _c[classes.variableWidth] = !isMobileAction,
                    _c))
            }, renderInput: function (params) {
                var _a;
                return (React.createElement(TextField, __assign({}, params, { size: 'small', variant: 'outlined', label: content.label || undefined, placeholder: content.placeholder, fullWidth: content.fullwidth || isMobileAction ? true : false, inputRef: inputRef, InputProps: __assign(__assign({}, params.InputProps), { onFocus: function () {
                            setOpen(true);
                        }, onBlur: function () {
                            setOpen(false);
                        }, onChange: function (event) { return debounceFunc(event.currentTarget.value); }, autoComplete: 'new-password', startAdornment: React.createElement(InputAdornment, { position: "start" },
                            " ",
                            ((_a = content.icon) === null || _a === void 0 ? void 0 : _a.name) ?
                                React.createElement(LmIcon, { iconName: content.icon.name }) : React.createElement(Magnify, null)) }) })));
            }, noOptionsText: content.not_found_label, getOptionLabel: function (option) { return option.label; }, PaperComponent: function (props) { return React.createElement(Paper, __assign({}, props, { square: content.menu_square, variant: content.menu_outlined ? 'outlined' : 'elevation', elevation: content.menu_elevation ? Number(content.menu_elevation) : 1, style: __assign(__assign({}, props.style), { borderRadius: content.menu_border_radius ? content.menu_border_radius : undefined }) })); }, renderOption: function (item) {
                var _a = getLinkAttrs({
                    cached_url: item.full_slug,
                    linktype: 'story'
                }, {}), rel = _a.rel, target = _a.target, external = _a.external, rest = __rest(_a, ["rel", "target", "external"]);
                return (React.createElement(MuiNextLink, { href: "/[...index]", as: rest.href, passHref: true, key: item.uuid, prefetch: false }, item.label));
            } })));
};
export default ListSearchAutocomplete;
