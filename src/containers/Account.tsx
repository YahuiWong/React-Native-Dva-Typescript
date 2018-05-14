import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from "react-native";
import { NavigationTabScreenOptions } from "react-navigation";
import * as RouterName from '../types/const/router';
import { NavigationActions } from '../utils';
import { connect } from '../utils/dva';
import { AppState } from '../models/states';
interface Props {
    dispatch?: any;
}
type IPropsAccount = AppState & Props;
class Account extends Component<IPropsAccount> {
    static navigationOptions: NavigationTabScreenOptions = {
        title: 'Account',
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../assets/images/person.png')}
            />
        ),
    };

    gotoLogin = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: RouterName.Login }));
    }

    logout = () => {
        this.props.dispatch({ type: 'app/logout' });
    }

    render() {
        const { login } = this.props;
        return (
            <View style={styles.container}>
                {login ? (
                    <Button title="Logout" onPress={this.logout} />
                ) : (
                        <Button title="Goto Login" onPress={this.gotoLogin} />
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
    icon: {
        width: 32,
        height: 32,
    },
});

function mapStateToProps(state: any) {
    return {
        ...state.app
    };
}
export default connect(mapStateToProps)(Account);