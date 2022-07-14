
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Apps from './Apps';
import StackNavigator from './src/navigations/StackNavigator'
import { name as appName } from './app.json';
import { Provider } from 'react-redux'
import { store } from './src/redux/app/store'


console.disableYellowBox = true;


const Root = () => (
    <Provider store={store}>
        <Apps />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
