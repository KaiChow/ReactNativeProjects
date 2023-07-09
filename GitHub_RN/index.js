/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FetchDemo from './js/FetchDemo';
import AsyncStoragePage from './js/AsyncStoragePage';

AppRegistry.registerComponent(appName, () =>AsyncStoragePage);
