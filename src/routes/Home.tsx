import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";

import {connect} from '../utils/dva';
interface Props {
    count:number,
    dispatch?:any
}
interface State {
}
class App extends Component<Props, State> {
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
});

function mapStateToProps(state:any) {
    return {
      count: state.count,
    };
  }
  export default connect(mapStateToProps)(App);