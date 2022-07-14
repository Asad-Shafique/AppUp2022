import React from 'react';
import { View } from 'react-native'
import Colors from '../themes/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bookings from '../screens/Bookings';
import CheckRoutes from '../screens/CheckRoutes';
import Settings from '../screens/Settings';
import Chat from '../screens/Chat';
import Icon from 'react-native-vector-icons/FontAwesome5'
import UpComings from '../screens/UpComings';
import { createNativeStackNavigator } from '@react-navigation/native-stack' 

const Tab = createBottomTabNavigator();

const BookingStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Bookings"
                component={Bookings}
            />
            <Stack.Screen
                name="Upcomings"
                component={UpComings}
            />

        </Stack.Navigator >
    );
};


const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
                tabBarActiveTintColor: '#616161',
                tabBarStyle: {
                    height: 60,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold'
                }
            }}
            initialRouteName={'Bookings'}>
            <Tab.Screen options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View
                        style={{
                            backgroundColor: focused ? Colors.THEME_COLOR : null,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: focused ? 2 : 0,
                            borderRadius: 15,
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            shadowOffset: { x: 2, y: 2 },
                            shadowRadius: 3,
                        }}>
                        {/* <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? Colors.THEME_WHITE : "#000000",
                                }}
                                resizeMode="contain"
                                source={AppImages.mail}
                            /> */}
                        <Icon name="map"
                            size={20}
                            color={focused ? Colors.THEME_WHITE : "#000000"} />
                    </View>
                ),
            }} name="Medical" component={CheckRoutes} />
            <Tab.Screen options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View
                        style={{
                            backgroundColor: focused ? Colors.THEME_COLOR : null,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: focused ? 2 : 0,
                            borderRadius: 15,
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            shadowOffset: { x: 2, y: 2 },
                            shadowRadius: 3,
                        }}>
                        {/* <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? Colors.THEME_WHITE : "#000000",
                                }}
                                resizeMode="contain"
                                source={AppImages.mail}
                            /> */}
                        <Icon name="home"
                            size={20}
                            color={focused ? Colors.THEME_WHITE : "#000000"} />
                    </View>
                ),
            }} name="Bookings" component={BookingStack} />

            

            <Tab.Screen options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View
                        style={{
                            backgroundColor: focused ? Colors.THEME_COLOR : null,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: focused ? 2 : 0,
                            borderRadius: 15,
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            shadowOffset: { x: 2, y: 2 },
                            shadowRadius: 3,
                        }}>
                        {/* <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? Colors.THEME_WHITE : "#000000",
                                }}
                                resizeMode="contain"
                                source={AppImages.mail}
                            /> */}
                        <Icon name="mail-bulk"
                            size={20}
                            color={focused ? Colors.THEME_WHITE : "#000000"} />
                    </View>
                ),
            }} name="Chat" component={Chat} />
            <Tab.Screen options={{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View
                        style={{
                            backgroundColor: focused ? Colors.THEME_COLOR : null,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: focused ? 2 : 0,
                            borderRadius: 15,
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            shadowOffset: { x: 2, y: 2 },
                            shadowRadius: 3,
                        }}>
                        {/* <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? Colors.THEME_WHITE : "#000000",
                                }}
                                resizeMode="contain"
                                source={AppImages.mail}
                            /> */}
                        <Icon name="bars"
                            size={20}
                            color={focused ? Colors.THEME_WHITE : "#000000"} />
                    </View>
                ),
            }} name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default BottomTabs