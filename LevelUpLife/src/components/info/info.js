import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TextInput } from 'react-native';
import { initCounter, initThresholds, updateUserModel } from '../firebase/firebaseConfig'
//import AgeForm from './ageForm';
//import {db} from '../../config/global.js'


export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            age: '',
            name: '',
            weight: 0,
            height: 0,
            gender: ''
        })
    }
    /* recordAge = (age) => {
        db.doc(user.email).set({
            ageID: age},
            { merge: true });
        this.props.navigation.navigate('Occupation'); 

    }*/
    recordData = (name, age, weight, height, gender) => {
        initCounter();
        initThresholds();
        console.log("User name is " + name);
        console.log("User age is " + age);
        console.log("User height is " + height);
        console.log("User weight is " + weight);
        console.log("User gender is " + gender);
        updateUserModel(name, age, height, weight, gender);
        this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome to LevelUpLife</Text>
                    <View style={styles.InfoFormContainer}>
                        <TextInput
                            placeholder="Name"
                            returnKeyType="next"
                            onChangeText={(name) => this.setState({ name })}
                            style={styles.input}
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Age"
                            returnKeyType="go"
                            onChangeText={(age) => this.setState({ age })}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Weight (in kilograms)"
                            returnKeyType="next"
                            onChangeText={(weight) => this.setState({ weight })}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Height (in meters)"
                            returnKeyType="next"
                            onChangeText={(height) => this.setState({ height })}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Gender (Male or Female)"
                            returnKeyType="go"
                            onChangeText={(gender) => this.setState({ gender })}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="words"
                        />
                    </View>
                    <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                        <Button
                            title="Next"
                            color="#3C6435"
                            onPress={() => this.recordData(this.state.name, this.state.age, this.state.weight, this.state.height, this.state.gender)}
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