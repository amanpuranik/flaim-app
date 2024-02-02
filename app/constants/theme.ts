import { colors } from './colors';
import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    // headlineLarge: {
    //     fontFamily: "Headline",
    //     letterSpacing: 4,
    //     lineHeight: 70,
    //     fontSize: 45
    // },
}
const genericOptions = {
    roundness: 2,
    fonts: configureFonts({ config: fontConfig }),

}

export const lightTheme = {
    ...MD3LightTheme,
    ...genericOptions,
    colors: colors.light,
}

export const darkTheme = {
    ...MD3DarkTheme,
    ...genericOptions,
    colors: colors.dark,
}




