import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Splash } from '../pages';

const appNavigator = createStackNavigator();

const Router = () => {
    return(
        <appNavigator.Navigator initialRouteName="Splash">
            <appNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <appNavigator.Screen name="Login" component={Login} />
        </appNavigator.Navigator>
    );
}

export default Router;
