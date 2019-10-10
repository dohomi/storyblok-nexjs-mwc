import * as React from 'react'
import SbEditable from 'storyblok-react'
import { Button } from '@rmwc/button'
import { TextField } from '@rmwc/textfield'
import { IconButton } from '@rmwc/icon-button'
import { createRef, FunctionComponent, RefObject } from 'react'
import { ToolbarSearchStoryblok } from '../../../typings/generated/components-schema'

const ToolbarSearch: FunctionComponent<{ content: ToolbarSearchStoryblok }> = ({ content }) => {
  const container: RefObject<HTMLDivElement> = createRef()
  const buttonContent = content.trigger && content.trigger[0] || {}
  const properties = buttonContent.properties || []
  const trailingIcon = buttonContent.trailing_icon && buttonContent.trailing_icon.name
  const icon = buttonContent.icon && buttonContent.icon.name
  const buttonProps = {
    trailingIcon,
    icon,
    label: buttonContent.label,
    ripple: !properties.includes('disable-ripple')
  }

  function openSearch() {
    const current = container.current
    if (current) {
      current.classList.add('active')
      const inputField = current.querySelector('.mdc-text-field__input') as HTMLInputElement
      inputField.focus()
    }
  }

  function onCancel() {
    const current = container.current
    if (current) {
      current.classList.remove('active')
      const inputField = current.querySelector('.mdc-text-field__input') as HTMLInputElement
      inputField.value = ''
    }
  }

  return (
    <SbEditable content={content}>
      <div ref={container} className="lm-toolbar-search">
        <Button {...buttonProps} onClick={openSearch} className="lm-toolbar-search__button-toggle" />
        <div className="lm-toolbar-search__input-container">
          <div className="d-flex align-items-center h-100">
            <div style={{ flex: 1 }}>
              <TextField fullwidth
                         id={content._uid}
                         placeholder={content.placeholder || 'Search...'}
                         icon="search" />
            </div>
            <IconButton icon="clear"
                        onClick={onCancel}
                        className="lm-toolbar-search__button-clear" />
          </div>
        </div>
      </div>
    </SbEditable>
  )
}

export default ToolbarSearch
