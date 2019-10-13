var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { formHandling } from './formHandling';
import { Select } from '@rmwc/select';
import * as React from 'react';
import { useState } from 'react';
var FormSelect = function (content) {
    var inputRef;
    var _a = formHandling({
        helpText: content.help_text,
        helpTextPersistent: content.help_text_persistent,
        errorMsgRequired: content.errorMsgRequired,
        errorMsgEmail: content.errorMsgEmail
    }), msg = _a.msg, onInputChange = _a.onInputChange;
    var _b = __read(useState(''), 2), value = _b[0], setValue = _b[1];
    function onChange(ev) {
        setValue(ev.target.value);
    }
    return <Select id={content._uid} name={content.name} outlined={content.border.includes('outlined')} label={content.label} enhanced={false} required={!!content.required} value={value} options={(content.options && content.options.map(function (i) { return ({
        value: i.value,
        label: i.label
    }); })) || []} inputRef={function (el) { return inputRef = el; }} helpText={msg} onBlur={function () { return onInputChange(inputRef); }} onChange={function (ev) { return onChange(ev); }}/>;
};
export default FormSelect;
