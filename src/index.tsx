import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {createLogger} from 'redux-logger';
import {dva , Model} from './utils/dva';
import Router, { routerMiddleware } from './router';

import count from './models/count';

import router from './models/router';
import Home from './containers/Home';
const app = dva({
    initialState: {},
    models: [router, count],
    // models:[m],
    onError(e: any) {
        console.error('onError', e);
    },
    onAction: [createLogger({collapsed: true}), routerMiddleware],

});
// registerModels(app)
const App = app.start(<Router />);

export default App;