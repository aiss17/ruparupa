import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Details, Home, Login, Monitoring, Splash } from '../pages';
import HomeNavigation from './bottom';

const appNavigator = createStackNavigator();

const Router = () => {
    return(
        <appNavigator.Navigator initialRouteName="Splash">
            <appNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <appNavigator.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <appNavigator.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <appNavigator.Screen name="HomeNavigation" component={HomeNavigation} options={{ headerShown: false }} />
            <appNavigator.Screen name="Monitoring" component={Monitoring} options={{ title: "Monitoring" }} />
            <appNavigator.Screen name="Details" component={Details} options={{ title: "Detail Event" }} />
        </appNavigator.Navigator>
    );
}

export default Router;
