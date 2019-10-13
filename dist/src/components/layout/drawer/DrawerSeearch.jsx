import { TextField } from '@rmwc/textfield';
import * as React from 'react';
var DrawerSearch = function (content) {
    return <TextField fullwidth id={content._uid} placeholder={content.placeholder || 'Search...'} icon="search"/>;
};
export default DrawerSearch;
