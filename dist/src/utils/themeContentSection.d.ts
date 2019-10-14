declare type ToolbarThemeItem = {
    primary: string;
    surface: string;
    onPrimary: string;
    [k: string]: string;
};
declare type ToolbarTheme = {
    white: ToolbarThemeItem;
    primary: ToolbarThemeItem;
    secondary: ToolbarThemeItem;
    dark: ToolbarThemeItem;
    [k: string]: any;
};
export declare const toolbar: ToolbarTheme;
export declare const section: {
    dark: {
        textPrimaryOnBackground: string;
        onSurface: string;
        background: string;
    };
    primary: {
        onSurface: string;
        textPrimaryOnBackground: string;
        background: string;
    };
    secondary: {
        onSurface: string;
        textPrimaryOnBackground: string;
        background: string;
    };
    light: {
        background: string;
        textPrimaryOnBackground: string;
        onSurface: string;
    };
    dark_text: {
        textPrimaryOnBackground: string;
        onSurface: string;
    };
    light_text: {
        textPrimaryOnBackground: string;
        onSurface: string;
    };
    transparent: {
        background: string;
    };
};
export {};
