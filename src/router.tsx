import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
  NavigationState,
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import * as RouterName from './types/const/router';

import * as ModelsStates from './models/states';

import Login from './containers/Login';
import Home from './containers/Home';
import Home1 from './containers/Home';
import Account from './containers/Account';
import Detail from './containers/Detail';
import Loading from './containers/Loading';

const HomeNavigator = createBottomTabNavigator(
  {
    [RouterName.Home]: { screen: Home },
    [RouterName.Home1]: { screen: Home1 },
    [RouterName.Account]: { screen: Account }
  }
);

HomeNavigator.navigationOptions = ({ navigation }:any) => {
  const { routeName } = navigation.state.routes[navigation.state.index]

  return {
    headerTitle: routeName,
  }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'float',
  }
)
const AppNavigator = createStackNavigator(
  {
    [RouterName.Main]: { screen: MainNavigator },
    [RouterName.Login]: { screen: Login },
  },
  {
    // headerMode: 'none',
    headerMode: 'float',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware<IProps>(
  'root',
  state => state.router
)
const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName(navigationState:NavigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}
interface IProps {
  count: ModelsStates.countState;
  app: ModelsStates.AppState;
  router: any;
  dispatch: any;
}

class Router extends PureComponent<IProps> {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }


  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    const { dispatch, router, app } = this.props;
    if (app.loading) return <Loading />;

    if (app.loading) return <Loading />

    return <App dispatch={dispatch} state={router} />
  }
}

// @connect(({ app, router }) => ({ app, router }))
function mapStateToProps(state: any) {
  return {
    count: state.count,
    router: state.router,
    app: state.app
  };
}
export default connect(mapStateToProps)(Router);
// export default Router
