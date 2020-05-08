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
const CategoryBox = ({ content }) => {
    const router = useRouter();
    const query = router === null || router === void 0 ? void 0 : router.query;
    let initialValues = [];
    if (query.search__categories) {
        initialValues = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories];
    }
    const [selected, setSelected] = useState(initialValues);
    const { allCategories } = useAppContext();
    let categories = allCategories;
    const filterByTags = (content.filter_by_tags && content.filter_by_tags.values) || [];
    const filterByCategories = content.filter_categories || [];
    if (filterByTags || filterByCategories.length) {
        categories = categories.filter((category) => {
            const categoryContent = category.content;
            if (!(categoryContent.tag_reference && categoryContent.tag_reference.values))
                return false; // remove all categories without tag_reference
            let exists = true;
            if (filterByTags.length) {
                const tagList = category.tag_list || [];
                exists = tagList.length && content.match_all_tags
                    ? filterByTags.every(element => tagList.includes(element))
                    : filterByTags.some(element => tagList.includes(element));
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
        const isChecked = event.currentTarget.checked;
        const value = event.currentTarget.value;
        if (isChecked) {
            const currentCategories = [...selected, value];
            setSelected(currentCategories);
            setSearchCategory(currentCategories);
        }
        else {
            const currentCategories = selected.filter(i => i !== value);
            setSelected(currentCategories);
            setSearchCategory(currentCategories);
        }
    }
    let style = {};
    // const style = { maxHeight: '500px', overflowY: 'auto' }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { style: style, className: clsx(content.class_names && content.class_names.values) }, categories.map((category) => {
            const value = category.content && category.content.tag_reference && category.content.tag_reference.values;
            return (React.createElement("div", { key: category.uuid },
                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { id: category.uuid, name: category.uuid, checked: selected.includes(value), value: value, onChange: onChange }), label: category.content && category.content.name })));
        }))));
};
export default CategoryBox;
