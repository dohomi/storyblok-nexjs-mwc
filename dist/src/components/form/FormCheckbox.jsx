import { formHandling } from './formHandling';
import { Checkbox } from '@rmwc/checkbox';
import * as React from 'react';
import { TextFieldHelperText } from '@rmwc/textfield';
var FormCheckbox = function (content) {
    var inputRef;
    var _a = formHandling({
        helpText: content.help_text,
        helpTextPersistent: content.help_text_persistent,
        errorMsgRequired: content.errorMsgRequired,
        errorMsgEmail: content.errorMsgEmail
    }), msg = _a.msg, onInputChange = _a.onInputChange;
    // not yet implemented
    // if (content.onChange) {
    //   fieldProps.onChange = (ev) => content.onChange(ev.target.value)
    // }
    var className = '';
    if (msg.validationMsg) {
        className = 'lm-checkbox-failed';
    }
    else {
        className = '';
    }
    return (<>
      <Checkbox id={content._uid} label={content.label} name={content.name} required={!!content.required} inputRef={function (el) { return inputRef = el; }} className={className} onBlur={function () { return onInputChange(inputRef); }}/>
      {msg.children && <TextFieldHelperText validationMsg={msg.validationMsg} persistent={msg.persistent}>{msg.children}</TextFieldHelperText>}
    </>);
};
export default FormCheckbox;
