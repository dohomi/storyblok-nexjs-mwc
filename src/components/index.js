import Page from './pages/Page'
import Section from './Section'
import Paragraph from './Paragraph'
import Headline from './Headline'
import Row from './Row'
import Column from './Column'
import Image from './Image'
import ImageList from './ImageList'
import Button from './Button'
import NavList from './NavList'
import RowNav from './RowNav'
import RowNested from './RowNested'
import Menu from './Menu'
import Icon from './Icon'
import SectionVideoBg from './SectionVideoBg'
import Slider from './Slider'
import Iframe from './Iframe'
import CardList from './CardList'

const Components = {
  'page': Page,
  'section': Section,
  'headline': Headline,
  'paragraph': Paragraph,
  'row': Row,
  'row_nav': RowNav,
  'column': Column,
  'column_nav': Column, // different set of components
  'image': Image,
  'image_list': ImageList,
  'button': Button,
  'nav_list': NavList,
  'row_nested': RowNested,
  'nav_menu': Menu,
  'icon': Icon,
  'iframe': Iframe,
  'slider': Slider,
  'section_video_bg': SectionVideoBg,
  'card_list': CardList
}

export default Components
