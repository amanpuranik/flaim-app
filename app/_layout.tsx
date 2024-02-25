import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider, } from 'react-native-paper';
import { lightTheme, darkTheme } from './constants/theme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Caveat-Medium": require('../assets/fonts/Caveat-Medium.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Headline: require('../assets/fonts/Headline.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <ActionSheetProvider>

        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen redirect name="[...missing]" /> */}
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="feed" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="friends" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="goal-feed" />
          <Stack.Screen name="goal" />
          <Stack.Screen name="create-goal" />
          <Stack.Screen name="edit-goal" />
          <Stack.Screen name="camera" />

        </Stack>
      </ActionSheetProvider>
    </PaperProvider>
  );
}


