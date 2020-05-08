var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { useState } from 'react';
// import { Checkbox } from '@rmwc/checkbox'
import SbEditable from 'storyblok-react';
import { setSearchCategory } from '../../utils/state/actions';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useAppContext } from '../provider/AppProvider';
var CategoryBox = function (_a) {
    var content = _a.content;
    var router = useRouter();
    var query = router === null || router === void 0 ? void 0 : router.query;
    var initialValues = [];
    if (query.search__categories) {
        initialValues = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories];
    }
    var _b = useState(initialValues), selected = _b[0], setSelected = _b[1];
    var allCategories = useAppContext().allCategories;
    var categories = allCategories;
    var filterByTags = (content.filter_by_tags && content.filter_by_tags.values) || [];
    var filterByCategories = content.filter_categories || [];
    if (filterByTags || filterByCategories.length) {
        categories = categories.filter(function (category) {
            var categoryContent = category.content;
            if (!(categoryContent.tag_reference && categoryContent.tag_reference.values))
                return false; // remove all categories without tag_reference
            var exists = true;
            if (filterByTags.length) {
                var tagList_1 = category.tag_list || [];
                exists = tagList_1.length && content.match_all_tags
                    ? filterByTags.every(function (element) { return tagList_1.includes(element); })
                    : filterByTags.some(function (element) { return tagList_1.includes(element); });
                if (exists)
                    return true;
            }
            if (filterByCategories.length) {
                return filterByCategories.includes(category.uuid);
            }
            return exists;
        });
    }
    function onChange(event) {
        var isChecked = event.currentTarget.checked;
        var value = event.currentTarget.value;
        if (isChecked) {
            var currentCategories = __spreadArrays(selected, [value]);
            setSelected(currentCategories);
            setSearchCategory(currentCategories);
        }
        else {
            var currentCategories = selected.filter(function (i) { return i !== value; });
            setSelected(currentCategories);
            setSearchCategory(currentCategories);
        }
    }
    var style = {};
    // const style = { maxHeight: '500px', overflowY: 'auto' }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { style: style, className: clsx(content.class_names && content.class_names.values) }, categories.map(function (category) {
            var value = category.content && category.content.tag_reference && category.content.tag_reference.values;
            return (React.createElement("div", { key: category.uuid },
                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { id: category.uuid, name: category.uuid, checked: selected.includes(value), value: value, onChange: onChange }), label: category.content && category.content.name })));
        }))));
};
export default CategoryBox;
