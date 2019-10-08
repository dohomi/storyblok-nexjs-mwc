import Page from './pages/Page'
import Section from './Section'
import Paragraph from './Paragraph'
import Headline from './headline/Headline'
import { MatRow, MatRowNested } from './Row'
import Column from './Column'
import Image from './image/Image'
import ImageList from './image-list/ImageList'
import Button from './button/Button'
import NavList from './nav-list/NavContainer'
import RowNav from './RowNav'
import Menu from './menu/Menu'
import Icon from './icon/Icon'
import SectionVideoBg from './SectionVideoBg'
import Slider from './slider/Slider'
import Iframe from './iframe/Iframe'
import CardList from './card/CardList'
import SectionParallax from './SectionParallax'
import ButtonList from './button-list/ButtonList'
import Html from './html/Html'
import HubspotForm from './form/HubspotForm'
import Form from './form/Form'
import HubspotMeeting from './HubspotMeeting'
import Pricing from './pricing/Pricing'
import Divider from './divider/Divider'
import Promotion from './promotion/Promotion'
import Accordion from './accordion/Accordion'
import Table from './table/Table'

const Components = {
  'page': Page,
  'table': Table,
  'accordion': Accordion,
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
