import Page from './Page'
import Section from './Section'
import Paragraph from './Paragraph'
import Headline from './Headline'
import Row from './Row'
import Column from './Column'
import Image from './Image'
import Button from './Button'
import NavList from './NavList'
import RowNav from './RowNav'
import RowNested from './RowNested'
import Menu from './Menu'

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
  'button': Button,
  'nav_list': NavList,
  'row_nested': RowNested,
  'nav_menu': Menu
}

export default Components
