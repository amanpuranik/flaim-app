import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    // headlineLarge: {
    //     fontFamily: "Headline",
    //     letterSpacing: 4,
    //     lineHeight: 70,
    //     fontSize: 45
    // },
};

const genericOptions = {
    roundness: 2,
    fonts: configureFonts({ config: fontConfig }),
};

export const lightTheme = {
    ...MD3LightTheme,
    ...genericOptions,
    colors: {
        ...MD3LightTheme.colors,
        approve: '#61C091',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    ...genericOptions,
    colors: {
        ...MD3DarkTheme.colors,
        approve: '#408162',
    },
};
