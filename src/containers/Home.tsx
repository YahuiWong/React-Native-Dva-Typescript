import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from "react-native";
import { NavigationTabScreenOptions } from "react-navigation";
import {NavigationActions} from '../utils';
import {connect} from '../utils/dva';
interface Props {
    count: number;
    dispatch?: any;
}
class App extends Component<Props> {
    static navigationOptions: NavigationTabScreenOptions  = {
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
            source={require('../images/house.png')}
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
                    Count: { this.props.count }
                </Text>
                <Button title="+" onPress={() => { this.props.dispatch({ type: 'count/add' }); }} />
                <Button title="-" onPress={() => { this.props.dispatch({ type: 'count/minus' }); }} />
                <Button title="+ async" onPress={() => { this.props.dispatch({ type: 'count/addWithDelay' }); }} />
                <Button title="Go TO Detail" onPress={() => {this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' })); }} />
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
    } ,
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
      count: state.count,
    };
  }
  export default connect(mapStateToProps)(App);