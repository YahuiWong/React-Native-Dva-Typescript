import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {createLogger} from 'redux-logger';
import dva from './utils/dva'
// import dva from 'dva/mobile';

import count from './models/count'
import Home from './routes/Home';
const app = dva({
    initialState: {},
    models: [count],
    onError(e:any) {
        console.error('onError', e)
    },
    onAction: createLogger({collapsed:true}),

})
// registerModels(app)
const App = app.start(<Home />)


export default App;