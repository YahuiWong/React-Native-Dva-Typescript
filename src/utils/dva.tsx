import React from 'react'
var {create}= require("dva-core")
export { connect }

export default function(options:any) {
  const app = create(options)
  // HMR workaround
//   if (!global.registered) 
  options.models.forEach((model:any) => app.model(model))
//   global.registered = true

  app.start()
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store

  app.start = (container:any) => () => <Provider store={store}>{container}</Provider>
  app.getStore = () => store

  return app
}

// import {
//   Reducer,
//   Action,
//   ReducersMapObject,
//   Dispatch,
//   MiddlewareAPI,
//   StoreEnhancer
// } from 'redux';

// import { Provider, connect } from 'react-redux'

// export function connect(
//   mapStateToProps?: Function,
//   mapDispatchToProps?: Function,
//   mergeProps?: Function,
//   options?: Object
// ): Function;
// export interface EffectsCommandMap {
//   put: <A extends Action>(action: A) => any;
//   call: Function;
//   select: Function;
//   take: Function;
//   cancel: Function;
//   [key: string]: any;
// }
// export interface EffectsMapObject {
//   [key: string]: Effect | EffectWithType;
// }
// export interface ReducerEnhancer {
//   (reducer: Reducer<any>): void
// }
// export interface SubscriptionAPI {
//   // history: History;
//   dispatch: Dispatch<any>;
// }
// export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
// export type EffectWithType = [Effect, { type : EffectType }];
// export type Effect = (action: Action, effects: EffectsCommandMap) => void;
// export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer];
// export type Subscription = (api: SubscriptionAPI, done: Function) => void;
// export interface SubscriptionsMapObject {
//   [key: string]: Subscription;
// }
// export interface Model {
//   namespace: string,
//   state?: any,
//   reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer,
//   effects?: EffectsMapObject,
//   subscriptions?: SubscriptionsMapObject,
// }