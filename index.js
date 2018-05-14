import { AppRegistry ,YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import App from './src';
AppRegistry.registerComponent('DvaTS', () => App);
