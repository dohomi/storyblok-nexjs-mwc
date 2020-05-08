import Page from './page/Page';
import Section from './section/Section';
import Headline from './headline/Headline';
import Image from './image/ImageElement';
import ImageList from './image-list/ImageList';
import NavList from './nav-list/NavList';
import Menu from './menu/NavMenu';
import Icon from './icon/Icon';
import SectionVideoBg from './section/SectionVideoBg';
import Slider from './slider/Slider';
import Iframe from './iframe/Iframe';
import CardList from './card/CardList';
import SectionParallax from './section/SectionParallax';
import ButtonList from './button-list/ButtonList';
import Html from './html/Html';
import HubspotMeeting from './hubspot-meeting/HubspotMeeting';
import Divider from './divider/Divider';
import Accordion from './accordion/Accordion';
import Table from './table/Table';
import Tabs from './tabs/Tabs';
import ListWidget from './list-widget/ListWidget';
import FlexRow from './flex-row/FlexRow';
import IframeAdvanced from './iframe/IframeAdvanced';
import CategoryBox from './list-widget/CategoryBox';
import ListSearchField from './list-widget/ListSearchField';
import LinkWwrap from './link/Link';
import ListSearchAutocomplete from './list-widget/ListSearchAutocomplete';
import RichTextParagraph from './paragraph/RichTextParagraph';
import LmMuiButton from './button/LmMuiButton';
import GridRow from './section/GridRow';
import GridColumn from './section/GridColumn';
import StaticSection from './static-section/StaticSection';
import StaticContainer from './static-section/StaticContainer';
import Timeline from './timeline/Timeline';
import LmAvatar from './avatar/LmAvatar';
import dynamic from 'next/dynamic';
import DateHeadline from './headline/DateHeadline';
import Motion from './motion/Motion';
// import HubspotForm from './hubspot/HubspotForm'
// import Form from './form/Form'
// import Pricing from './pricing/Pricing'
// import Promotion from './promotion/Promotion'
var Components = {
    'page': Page,
    'table': Table,
    'accordion': Accordion,
    // 'promotion': Promotion,
    'static_section': StaticSection,
    'static_container': StaticContainer,
    'divider': Divider,
    'html': Html,
    // 'pricing': Pricing,
    // 'hubspot_form': HubspotForm,
    'hubspot_meeting': HubspotMeeting,
    'button_list': ButtonList,
    'section': Section,
    'headline': Headline,
    'paragraph': dynamic(function () { return import('./paragraph/Paragraph'); }),
    'row': GridRow,
    'column': GridColumn,
    'image': Image,
    'image_list': ImageList,
    'button': LmMuiButton,
    'nav_list': NavList,
    'nav_menu': Menu,
    'icon': Icon,
    'iframe': Iframe,
    'slider': Slider,
    'section_video_bg': SectionVideoBg,
    'card_list': CardList,
    'section_parallax': SectionParallax,
    // 'form': Form,
    'tabs': Tabs,
    'list_widget': ListWidget,
    'flex_row': FlexRow,
    'iframe_advanced': IframeAdvanced,
    'category_box': CategoryBox,
    'list_search_field': ListSearchField,
    'link': LinkWwrap,
    'list_search_autocomplete': ListSearchAutocomplete,
    'rich_text_editor': RichTextParagraph,
    'timeline': Timeline,
    'avatar': LmAvatar,
    'date_headline': DateHeadline,
    'motion': Motion
};
export default Components;
