import { setGlobalState } from './state';
export const toggleLeftNavigation = () => {
    setGlobalState('leftNavigationDrawer', value => !value);
};
export const toggleRightNavigation = () => {
    setGlobalState('rightNavigationDrawer', value => !value);
};
export const closeNavigationDrawers = () => {
    setGlobalState('leftNavigationDrawer', false);
    setGlobalState('rightNavigationDrawer', false);
};
// export const setAppSetup = (options: State['appSetup']) => {
//   setGlobalState('appSetup', options)
// }
const addSearchParamsToUrl = ({ categories, searchText }) => {
    const currentUrl = new URL(window.location.href);
    if (categories) {
        currentUrl.searchParams.delete('search__categories');
        categories.forEach((category) => {
            currentUrl.searchParams.append('search__categories', category);
        });
    }
    if (searchText !== undefined) {
        if (!searchText) {
            currentUrl.searchParams.delete('search__text');
        }
        else {
            currentUrl.searchParams.set('search__text', searchText);
        }
    }
    window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);
    window.scrollTo(0, 0);
};
export const onSearchTextChange = (searchText) => {
    setGlobalState('searchParams', (v) => (Object.assign(Object.assign({}, v), { searchText })));
    addSearchParamsToUrl({ searchText });
};
export const setSearchCategory = (categories) => {
    setGlobalState('searchParams', (v) => (Object.assign(Object.assign({}, v), { categories })));
    addSearchParamsToUrl({ categories });
};
