import { delay, NavigationActions } from '../utils';
import { Model , EffectsCommandMap} from "../utils/dva";
import { routerState} from './states';
import { routerReducer } from './states/router';
const actions = Object.values(NavigationActions).filter(
  (x: any) => typeof x === 'string' && x.startsWith('Navigation/')
);

const isPushAction = (action: any) =>
  action.type === NavigationActions.NAVIGATE ||
  // action.type === NavigationActions.PUSH;
  action.type === 'Navigation/PUSH'; // @types/react-navigation 里缺少  NavigationActions.PUSH的定义，暂时这样解决

export default {
  namespace: 'router',
  state: {
    ...routerState,
  },
  reducers: {
    apply(state: any, { payload: action }) {
      return routerReducer(state, action);
    },
  },
  effects: {
    handlePush: [
      function* handlePush(action) {
        let { take, call, put } = <EffectsCommandMap><any>action;
        while (true) {
          const { payload } = yield take('handlePush');
          yield put({
            type: 'apply',
            payload,
          });
          // debounce, see https://github.com/react-community/react-navigation/issues/271
          yield call(delay, 500);
        }
      },
      { type: 'watcher' },
    ],
    watch: [
      function* watch(action) {
        let { take, put } = <EffectsCommandMap><any>action;
        while (true) {
          const action = yield take(actions);
          yield put({
            type: isPushAction(action) ? 'handlePush' : 'apply',
            payload: action,
          });
        }
      },
      { type: 'watcher' },
    ],
  },
} as Model;
