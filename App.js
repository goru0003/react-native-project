import React, { useEffect, useCallback } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SearchProvider } from './src/context/SearchContext';
import { RentedProvider } from './src/context/RentedContext';
import theme from './src/theme/theme';
import Navigation from './src/navigation/Navigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const App = () => {

  const [fontsLoaded] = useFonts({
    'My-Font': require('./assets/fonts/Oswald-Bold.ttf'), 
  });

 
  const FontReadyForLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded]);

  useEffect(() => {
    
    FontReadyForLayout();
  }, [fontsLoaded, FontReadyForLayout]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <RentedProvider>
          <Navigation />    
        </RentedProvider>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
