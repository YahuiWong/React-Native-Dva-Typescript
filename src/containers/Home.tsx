import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from "react-native";
import { NavigationTabScreenOptions, NavigationScreenProps } from "react-navigation";
import { NavigationActions } from '../utils';
import { connect } from '../utils/dva';
import { countState } from '../models/states';
import * as RouterName from '../types/const/router';
interface Props {
    count: countState;
    dispatch?: any;
}
type IPropsHome = NavigationScreenProps & Props;
class Home extends Component<IPropsHome> {
    static navigationOptions: NavigationTabScreenOptions = {
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../assets/images/house.png')}
            />
        ),
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.text}>
                    Count: {this.props.count}
                </Text>
                <Button title="+" onPress={() => { this.props.dispatch({ type: 'count/add' }); }} />
                <Button title="-" onPress={() => { this.props.dispatch({ type: 'count/minus' }); }} />
                <Button title="+ async" onPress={() => { this.props.dispatch({ type: 'count/addWithDelay' }); }} />
                <Button title="Go TO Detail" onPress={() => { this.props.dispatch(NavigationActions.navigate({ routeName: RouterName.Detail, params: { from: "Home" } })); }} />
                <Button title="Go TO Account" onPress={() => { this.props.dispatch(NavigationActions.navigate({ routeName: RouterName.Account })); }} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

function mapStateToProps(state: any) {
    return {
        ...state
    };
}
export default connect(mapStateToProps)(Home);