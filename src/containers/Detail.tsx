import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
interface Props {
}
export default class App extends Component<Props> {
    static navigationOptions = {
        title: 'Detail',
      }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.text}>
                    Detail
                </Text>
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