import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
// import SImmutable from 'seamless-immutable';

import {createLogger} from 'redux-logger';
import {dva , Model} from './utils/dva';
import Router, { routerMiddleware } from './router';
import * as models from './models';

let initState = {};

const app = dva({
    initialState: initState,
    models: Object.values(models),
    // models:[m],
    onError(e: any) {
        console.error('onError', e);
    },
    onAction: [createLogger({collapsed: true}), routerMiddleware],

});
// registerModels(app)
const App = app.start(<Router />);

export default App;