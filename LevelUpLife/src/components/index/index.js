import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


export default class Index extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome to LevelUpLife</Text>
                <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                    <Button
                        title="Login"
                        color="#3C6435"
                        onPress={() => this.props.navigation.navigate("Login")}
                    />
                </View>

                <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                    <Button
                        title="Register"
                        color="#3C6435"
                        onPress={() => this.props.navigation.navigate("Register")}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BCF4F5',
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    title: {
        color: '#000000',
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30,
    },

    InfoFormContainer: {
        marginTop: 50,
        padding: 20,
    },

    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        color: '#000000',
        paddingHorizontal: 10
    },
});