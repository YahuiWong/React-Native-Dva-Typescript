// import SImmutable from 'seamless-immutable';

import { delay } from '../utils/index';
import { Model } from "../utils/dva";
import { countState } from './states';



let initState: countState = 0;
export default {
  namespace: 'count',
  state: initState,
  reducers: {
    add(state: countState) { return state + 1; },
    minus(state: countState) { return state - 1; },
  },
  effects: {
    *addWithDelay(action: any, { call, put }) {
      console.log('====================================');
      console.log(action);
      console.log('====================================');
      console.log(call);
      console.log('====================================');
      console.log(put);
      console.log('====================================');
      yield call(delay, 1000);
      yield put({ type: 'add' });
    }
  },
} as Model;