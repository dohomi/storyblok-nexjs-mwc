import * as React from 'react';
import SbEditable from 'storyblok-react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';
import { createRef } from 'react';
var ToolbarSearch = function (_a) {
    var content = _a.content;
    var container = createRef();
    var buttonContent = content.trigger && content.trigger[0] || {};
    var properties = buttonContent.properties || [];
    var trailingIcon = buttonContent.trailing_icon && buttonContent.trailing_icon.name;
    var icon = buttonContent.icon && buttonContent.icon.name;
    var buttonProps = {
        trailingIcon: trailingIcon,
        icon: icon,
        label: buttonContent.label,
        ripple: !properties.includes('disable-ripple')
    };
    function openSearch() {
        var current = container.current;
        if (current) {
            current.classList.add('active');
            var inputField = current.querySelector('.mdc-text-field__input');
            inputField.focus();
        }
    }
    function onCancel() {
        var current = container.current;
        if (current) {
            current.classList.remove('active');
            var inputField = current.querySelector('.mdc-text-field__input');
            inputField.value = '';
        }
    }
    return (<SbEditable content={content}>
      <div ref={container} className="lm-toolbar-search">
        <Button {...buttonProps} onClick={openSearch} className="lm-toolbar-search__button-toggle"/>
        <div className="lm-toolbar-search__input-container">
          <div className="d-flex align-items-center h-100">
            <div style={{ flex: 1 }}>
              <TextField fullwidth id={content._uid} placeholder={content.placeholder || 'Search...'} icon="search"/>
            </div>
            <IconButton icon="clear" onClick={onCancel} className="lm-toolbar-search__button-clear"/>
          </div>
        </div>
      </div>
    </SbEditable>);
};
export default ToolbarSearch;
