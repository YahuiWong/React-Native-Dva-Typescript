import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {createLogger} from 'redux-logger';
import dva from './utils/dva'
// import dva from 'dva/mobile';

import { registerModels } from './models'
import Router from './scenes'
import UserModel from './models/User';
const app = dva({
    initialState: {},
    models: [UserModel],
    onError(e:any) {
        console.error('onError', e)
    },
    onAction: createLogger({collapsed:true}),

})
// registerModels(app)
const App = app.start(<Router />)


export default App;