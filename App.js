import React, {useEffect} from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SearchProvider } from './src/context/SearchContext';
import { RentedProvider } from './src/context/RentedContext';
import theme from './src/theme/theme';
import Navigation from './src/navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
     
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

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