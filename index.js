/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import QRCamera from './qrcamera';
import QRCodeCamera from './scanqrcode';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => QRCodeCamera);
