import React, { Component, PureComponent } from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux'
// const { connect } require('dva-core');
import { BackHandler, View, Text } from 'react-native';

import Login from './Home';
interface ContainerPropaties {
    dispatch: any;
    nav: any;
  }
const middleware = createReactNavigationReduxMiddleware(
    "root",
    (state:ContainerPropaties) => state.nav,
  );
  const addListener = createReduxBoundAddListener("root");


const AppNavigator = StackNavigator(
    {
        Home: { screen: Login }
    }
);

function getCurrentScreen(navigationState: any):any {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentScreen(route);
    }
    return route.routeName;
}

@connect(({ router }: { router?: any }) => ({ router }))
class Router extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false;
    }

    render() {
        const { dispatch, router } = this.props;
        const navigation = addNavigationHelpers({ dispatch, state: router,addListener })
        return <AppNavigator navigation={navigation} />
    }
}

// export function routerReducer(state: any, action = {}) {
//     return AppNavigator.router.getStateForAction(action, state)
// }

export default Router;