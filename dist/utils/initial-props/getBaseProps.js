export var getBaseProps = function (error) { return ({
    page: { _uid: '', component: 'page' },
    error: error,
    settings: { _uid: '', component: 'global', theme_base: 'base' },
    allCategories: [],
    allStaticContent: [],
    locale: '',
    listWidgetData: {}
}); };
