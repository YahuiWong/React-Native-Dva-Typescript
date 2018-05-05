
import {delay} from '../utils/index';
type countState=number
export default {
  namespace: 'count',
  state: 0 as countState,
  reducers: {
    add(state:countState) { return state + 1; },
    minus(state:countState) { return state - 1; },
  },
  effects: {
    *addWithDelay(action, { call, put }) {
      console.log('====================================');
      console.log(action);
      console.log('====================================');
      console.log('====================================');
      console.log(call);
      console.log('====================================');
      console.log('====================================');
      console.log(put);
      console.log('====================================');
      yield call(delay, 1000);
      yield put({ type: 'add' });
    }
  },
}