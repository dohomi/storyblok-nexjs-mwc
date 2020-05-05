import SbEditable from 'storyblok-react'
import React, { CSSProperties, FunctionComponent } from 'react'
import CardWrapWithAction from './CardWrapWithAction'
import { CardListItemProps } from './cards'
import Card from '@material-ui/core/Card'
import ContentLink from '../link/ContentLink'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  faded: {
    boxShadow:
      '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
  },
  float: {
    boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)'
  },
  hover: {
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    transition: '0.3s',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
    }
  },
  lightTop: {
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  bouncy: {
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&:hover': {
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      transform: 'scale(1.04)'
    }
  },
  soft: {
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    transition: '0.3s',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
    }
  }
})

const CardWrap: FunctionComponent<CardListItemProps> = ({ children, content, options }) => {
  const className = 'lm-card'
  const styles = useStyles()
  const variants = options.variant || []
  const style: CSSProperties = {
    borderRadius: options.border_radius ? options.border_radius : undefined
  }


  if (content.body && content.body.length) {
    return <CardWrapWithAction className={className}
                               content={content}
                               style={style}
                               options={options}>{children}</CardWrapWithAction>
  }

  return (
    <SbEditable content={content}>
      <Card className={clsx(className, {
        [styles[options.shadow_effect]]: !!options.shadow_effect
      })}
            raised={variants.includes('raised')}
            elevation={options.elevation ? Number(options.elevation) : undefined}
            style={style}>
        <ContentLink content={content} className={'lm-card__link'}>
          {children}
        </ContentLink>
      </Card>
    </SbEditable>
  )
}

export default CardWrap
