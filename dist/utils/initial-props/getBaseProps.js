export const getBaseProps = (error) => ({
    page: { _uid: '', component: 'page' },
    error,
    settings: { _uid: '', component: 'global', theme_base: 'base' },
    allCategories: [],
    allStaticContent: [],
    locale: '',
    listWidgetData: {}
});
