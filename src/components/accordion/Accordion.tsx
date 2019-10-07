import SbEditable from 'storyblok-react'
import AccordionItem from './AccordionItem'

const Accordion = ({content}) => {

  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {content.body.map(blok => <AccordionItem {...blok} key={blok._uid}/>)}
      </div>
    </SbEditable>
  )
}

export default Accordion
