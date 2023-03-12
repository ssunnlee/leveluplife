import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TextInput, Alert } from 'react-native';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            username: '',
            password: ''
        })
    }
    attemptLogin = (username, password) => {
        console.log("Username is " + username);
        // TODO: authentification logic
        if (password == "test") {
            this.props.navigation.navigate("Home");
        } else {
            Alert.alert('Login', 'Login information is incorrect', [
                { text: 'OK' },
            ]);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome to LevelUpLife</Text>
                    <View style={styles.InfoFormContainer}>
                        <TextInput
                            placeholder="Username"
                            returnKeyType="next"
                            onChangeText={(username) => this.setState({ username })}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Password"
                            returnKeyType="go"
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                        <Button
                            title="Login"
                            color="#3C6435"
                            onPress={() => this.attemptLogin(this.state.username, this.state.password)}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
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