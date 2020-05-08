import * as React from 'react';
import { useState } from 'react';
import SbEditable from 'storyblok-react';
import { useDebouncedCallback } from 'use-debounce';
import { onSearchTextChange } from '../../utils/state/actions';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Magnify from 'mdi-material-ui/Magnify';
const ListSearchField = ({ content }) => {
    const router = useRouter();
    const query = router === null || router === void 0 ? void 0 : router.query;
    const [searchText, setSearchText] = useState(query.search__text || '');
    const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
        onSearchTextChange(value);
    }, 
    // delay in ms
    300);
    function onSearchChange(ev) {
        const value = ev.currentTarget.value;
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
