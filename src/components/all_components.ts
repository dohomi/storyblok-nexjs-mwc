import Page from './page/Page'
import Section from './section/Section'
import Paragraph from './paragraph/Paragraph'
import Headline from './headline/Headline'
import { MatRow, MatRowNested } from './section/Row'
import Column from './section/Column'
import Image from './image/ImageElement'
import ImageList from './image-list/ImageList'
import NavList from './nav-list/NavList'
import Menu from './menu/NavMenu'
import Icon from './icon/Icon'
import SectionVideoBg from './section/SectionVideoBg'
import Slider from './slider/Slider'
import Iframe from './iframe/Iframe'
import CardList from './card/CardList'
import SectionParallax from './section/SectionParallax'
import ButtonList from './button-list/ButtonList'
import Html from './html/Html'
import HubspotForm from './hubspot/HubspotForm'
import Form from './form/Form'
import HubspotMeeting from './hubspot/HubspotMeeting'
import Pricing from './pricing/Pricing'
import Divider from './divider/Divider'
// import Promotion from './promotion/Promotion'
import Accordion from './accordion/Accordion'
import Table from './table/Table'
import Tabs from './tabs/Tabs'
import ListWidget from './list-widget/ListWidget'
import FlexRow from './flex-row/FlexRow'
import IframeAdvanced from './iframe/IframeAdvanced'
import CategoryBox from './list-widget/CategoryBox'
import ListSearchField from './list-widget/ListSearchField'
import LinkWwrap from './link/Link'
import ListSearchAutocomplete from './list-widget/ListSearchAutocomplete'
import RichTextParagraph from './paragraph/RichTextParagraph'
import LmMuiButton from './button/LmMuiButton'

const Components = {
  'page': Page,
  'table': Table,
  'accordion': Accordion,
  // 'promotion': Promotion,
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
  'column': Column,
  'image': Image,
  'image_list': ImageList,
  'button': LmMuiButton,
  'nav_list': NavList,
  'row_nested': MatRowNested,
  'nav_menu': Menu,
  'icon': Icon,
  'iframe': Iframe,
  'slider': Slider,
  'section_video_bg': SectionVideoBg,
  'card_list': CardList,
  'section_parallax': SectionParallax,
  'form': Form,
  'tabs': Tabs,
  'list_widget': ListWidget,
  'flex_row': FlexRow,
  'iframe_advanced': IframeAdvanced,
  'category_box': CategoryBox,
  'list_search_field': ListSearchField,
  'link': LinkWwrap,
  'list_search_autocomplete': ListSearchAutocomplete,
  'rich_text_editor': RichTextParagraph
}

export default Components
