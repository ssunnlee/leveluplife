import React, { Component, useContext } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TextInput, Alert } from 'react-native';
import { userIntake } from '../firebase/firebaseConfig';
import { UserContext } from '../../../App';
//import AgeForm from './ageForm';
//import {db} from '../../config/global.js'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            fat: 0,
            protein: 0,
            carbs: 0,
            ch: 0,
            cal: 0
        })
    }

    recordData = async (fat, protein, carbs, ch, cal) => {
        const { user, _ } = useContext(UserContext);
        const st = await userIntake(user.uuid, fat, protein, carbs, parseInt(ch), cal);
        console.log(st);
        Alert.alert("Notification", st);
        //this.props.navigation.goBack();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome to LevelUpLife</Text>
                    <View style={styles.ageFormContainer}>
                        <TextInput
                            placeholder="Cholesterol (in mg)"
                            returnKeyType="go"
                            onChangeText={(ch) => this.setState({ ch })}
                            style={styles.input}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                        <Button
                            title="Next"
                            color="#3C6435"
                            onPress={() => this.recordData(this.state.fat, this.state.protein, this.state.carbs, this.state.ch, this.state.cal)}
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