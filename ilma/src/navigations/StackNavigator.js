import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import BottomTabs from './BottomTab';
import SignUp from '../screens/SignUp';
import UpComings from '../screens/UpComings';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} />
                <Stack.Screen name="Upcomings" component={UpComings} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;