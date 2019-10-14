import { formHandling } from './formHandling';
import { TextField } from '@rmwc/textfield';
import * as React from 'react';
var FormTextfield = function (content) {
    var inputRef;
    var _a = formHandling({
        helpText: content.help_text,
        helpTextPersistent: content.help_text_persistent,
        errorMsgRequired: content.errorMsgRequired,
        errorMsgEmail: content.errorMsgEmail
    }), msg = _a.msg, onInputChange = _a.onInputChange;
    var fieldProps = {
        id: content._uid,
        name: content.name,
        label: content.label || 'label',
        type: content.type || 'text',
        required: !!content.required,
        outlined: content.border.includes('outlined'),
        textarea: content.textarea,
        inputRef: function (el) { return inputRef = el; },
        helpText: msg,
        onBlur: function () { return onInputChange(inputRef); }
    };
    if (fieldProps.textarea) {
        delete fieldProps.type;
        fieldProps.outlined = true;
    }
    return <TextField {...fieldProps}/>;
};
export default FormTextfield;
