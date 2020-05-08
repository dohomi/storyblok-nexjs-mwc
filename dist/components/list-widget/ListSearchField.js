import * as React from 'react';
import { useState } from 'react';
import SbEditable from 'storyblok-react';
import { useDebouncedCallback } from 'use-debounce';
import { onSearchTextChange } from '../../utils/state/actions';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Magnify from 'mdi-material-ui/Magnify';
var ListSearchField = function (_a) {
    var content = _a.content;
    var router = useRouter();
    var query = router === null || router === void 0 ? void 0 : router.query;
    var _b = useState(query.search__text || ''), searchText = _b[0], setSearchText = _b[1];
    var debouncedCallback = useDebouncedCallback(
    // function
    function (value) {
        onSearchTextChange(value);
    }, 
    // delay in ms
    300)[0];
    function onSearchChange(ev) {
        var value = ev.currentTarget.value;
        setSearchText(value);
        debouncedCallback(value);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(content.class_names && content.class_names.values) },
            React.createElement(TextField, { InputProps: {
                    startAdornment: React.createElement(Magnify, null)
                }, id: content._uid, value: searchText, label: content.label, type: "search", placeholder: content.placeholder, variant: 'outlined', onChange: onSearchChange }))));
};
export default ListSearchField;
