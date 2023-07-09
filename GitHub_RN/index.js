/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FetchDemo from './js/FetchDemo';

AppRegistry.registerComponent(appName, () => FetchDemo);
