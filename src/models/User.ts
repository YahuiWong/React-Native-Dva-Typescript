import { createAction, NavigationActions } from "../utils"
import {
    login,
    
} from '../services/user';


import { AsyncStorage } from 'react-native';

import axios from 'axios';

import { Alert } from 'react-native';

// const APP_AUTH = '@User:App_auth';
export default {
    namespace: 'user',
    state: {
        userInfo: {},
        canLogin: false,
        phone: '',
        password: '',
        code: '',
        showLogin: false,
        app_auth: {},
        isLogin: false
    },
    reducers: {
        loginStart(state:any, { payload }) {
            return { ...state, ...payload }
        },
        logout(state:any, { payload }) {
            return { ...state, ...payload }
        },
        loginSuccess(state:any, { payload }) {
            return { ...state, ...payload };
        }

    },
    effects: {
        
        *login({ payload }, { call, put, select }) {
            const data = yield call(login, payload);
            if (data.data.code === 'SUCCESS') {
                yield put(createAction('loginSuccess')({ userInfo: data.data.data }));
                let app_auth = data.data.data.app_auth;
                setAccessToken(app_auth.access_token)
                yield put(NavigationActions.back());
                app_auth.currentTimestamp = Math.floor(new Date().getTime() / 1000);
                yield AsyncStorage.setItem("APP_AUTH_KEY", JSON.stringify(app_auth));

            } else {
                Toast.fail(data.data.info);
                yield put(createAction('logout')({ userInfo: {} }))
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'handleLoginStatus' })
        },
    },
}
