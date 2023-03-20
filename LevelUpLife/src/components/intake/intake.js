import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { userIntake } from '../firebase/firebaseConfig';
import { UserContext } from '../../../UserContext';

export default class Intake extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props)
        this.state = ({
            fat: 0,
            protein: 0,
            fiber: 0,
            ch: 0,
            cal: 0
        })
    }

    recordData = async (fat, protein, fiber, ch, cal) => {
        //const user = UserContext.user;
        //const st = await userIntake(user.uid, fat, protein, fiber, parseInt(ch), cal);
        //console.log(st);
        console.log("User fat is " + fat);
        console.log("User protein is " + protein);
        console.log("User fiber is " + fiber);
        console.log("User cholesterol is " + ch);
        console.log("User calories is " + cal);
        //Alert.alert("Notification", st);
        //this.props.navigation.goBack();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Recording Intake</Text>
                        <View style={styles.ageFormContainer}>
                            <TextInput
                                placeholder="Fat"
                                returnKeyType="next"
                                onChangeText={(fat) => this.setState({ fat })}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType='numeric'
                            />
                            <TextInput
                                placeholder="Protein"
                                returnKeyType="next"
                                onChangeText={(protein) => this.setState({ protein })}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType='numeric'
                            />
                            <TextInput
                                placeholder="Fiber"
                                returnKeyType="next"
                                onChangeText={(fiber) => this.setState({ fiber })}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType='numeric'
                            />
                            <TextInput
                                placeholder="Cholesterol (in mg)"
                                returnKeyType="next"
                                onChangeText={(ch) => this.setState({ ch })}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType='numeric'
                            />
                            <TextInput
                                placeholder="Calories"
                                returnKeyType="go"
                                onChangeText={(cal) => this.setState({ cal })}
                                style={styles.input}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                            <Button
                                title="Enter"
                                color="#3C6435"
                                onPress={() => this.recordData(this.state.fat, this.state.protein, this.state.fiber, this.state.ch, this.state.cal)}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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

    ageFormContainer: {
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