/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Apps from './Apps';
import StackNavigator from './src/navigations/StackNavigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Apps);
