import React, { Component } from 'react';
import { Button , TouchableOpacity  , StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import {connect} from '../utils/dva';

// import { Button, Touchable } from '../components';

import { createAction, NavigationActions } from '../utils';
interface Props {
    login: boolean;
    loading: boolean;
    fetching: boolean;
    dispatch?: any;
}
// @connect(({ app }) => ({ ...app }))
class Login extends Component<Props> {
  static navigationOptions = {
    title: 'Login',
  };

  onLogin = () => {
    // this.props.dispatch(createAction('app/login')());
    this.props.dispatch({ type: 'app/login' });
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    const { fetching } = this.props;
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <Button title="Login" onPress={this.onLogin} />
        )}
        {!fetching && (
          <TouchableOpacity  style={styles.close} onPress={this.onClose}>
            <Text>Close</Text>
          </TouchableOpacity >
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
});

function mapStateToProps(state: any) {
    return {
        login: state.login,
        loading:  state.loading,
        fetching:  state.fetching
    };
  }
  export default connect(mapStateToProps)(Login);