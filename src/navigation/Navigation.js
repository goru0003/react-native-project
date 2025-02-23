import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RentedScreen from '../screens/RentedScreen';
import WatchScreen from '../screens/WatchScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Rented" component={RentedScreen} />
                <Stack.Screen name="Watch" component={WatchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation; 