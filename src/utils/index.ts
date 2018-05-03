import axios from 'axios';
import { ListView, Dimensions } from 'react-native';
import Immutable from 'immutable';
export const dataSourceRowInit = () => {
    return new ListView.DataSource({
        // rowHasChanged: (row1, row2) =>row1 !== row2,
        rowHasChanged: (row1, row2) => Immutable.is(row1, row2)

    })
}

export { NavigationActions } from 'react-navigation'

export const setAccessToken = (access_token:string) => {
    axios.defaults.headers.common['Access-Token'] = access_token;
}

export const delay = (time:any) => new Promise(resolve => setTimeout(resolve, time))

export const createAction = (type:any) => (payload:any) => ({ type, payload });

export const DEVICE_WIDTH = Dimensions.get("window").width;

export const isEmptyObj = (obj:any) => {
    for (let i in obj) {
        if (obj[i]) return false;
    }
    return true;
}

export const indexOf = (arr:any, name:any, val:any) => {
    for (let i in arr) {
        if (arr[i][name] === val) {
            return i;
        }
    }
    return -1;
}
