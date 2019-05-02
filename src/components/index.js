import Page from './pages/Page'
import Section from './Section'
import Paragraph from './Paragraph'
import Headline from './Headline'
import {MatRow, MatRowNested} from './Row'
import Column from './Column'
import Image from './Image'
import ImageList from './ImageList'
import Button from './Button'
import NavList from './nav-list/NavContainer'
import RowNav from './RowNav'
import Menu from './menu/Menu'
import Icon from './Icon'
import SectionVideoBg from './SectionVideoBg'
import Slider from './slider/Slider'
import Iframe from './Iframe'
import CardList from './card/CardList'
import SectionParallax from './SectionParallax'
import ButtonList from './ButtonList'
import Html from './Html'
import HubspotForm from './HubspotForm'
import Form from './Form'
import HubspotMeeting from './HubspotMeeting'
import Pricing from './pricing/Pricing'
import Divider from './Divider'
import Promotion from './promotion/Promotion'

const Components = {
  'page': Page,
  'promotion': Promotion,
  'divider': Divider,
  'html': Html,
  'pricing': Pricing,
  'hubspot_form': HubspotForm,
  'hubspot_meeting': HubspotMeeting,
  'button_list': ButtonList,
  'section': Section,
  'headline': Headline,
  'paragraph': Paragraph,
  'row': MatRow,
  'row_nav': RowNav,
  'column': Column,
  'column_nav': Column, // different set of components
  'image': Image,
  'image_list': ImageList,
  'button': Button,
  'nav_list': NavList,
  'row_nested': MatRowNested,
  'nav_menu': Menu,
  'icon': Icon,
  'iframe': Iframe,
  'slider': Slider,
  'section_video_bg': SectionVideoBg,
  'card_list': CardList,
  'section_parallax': SectionParallax,
  'form': Form
}

export default Components
