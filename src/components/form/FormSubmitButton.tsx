import { mapButtonProps } from '../button/Button'
import { CircularProgress } from '@rmwc/circular-progress'
import { Button } from '@rmwc/button'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../typings/generated/components-schema'

const FormSubmitButton: FunctionComponent<ButtonStoryblok> = (content) => {
  const buttonProps = mapButtonProps(content)
  if (content.isLoading) {
    buttonProps.icon = <CircularProgress />
  }

  return <Button {...buttonProps}
                 disabled={content.isLoading}
                 type="submit" />
}

export default FormSubmitButton
