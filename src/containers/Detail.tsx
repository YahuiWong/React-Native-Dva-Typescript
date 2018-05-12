import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
interface Props {
}
type IPropsDetail = NavigationScreenProps&Props;
export default class Detail extends Component<IPropsDetail> {
    static navigationOptions = {
        title: 'Detail',
      };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.text}>
                    Detail from {this.props.navigation.state.params.from}
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