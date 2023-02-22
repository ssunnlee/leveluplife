import React, { Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView, Button, TextInput} from 'react-native';
//import AgeForm from './ageForm';
//import {db} from '../../config/global.js'


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = ({
            age:'',
            name:'',
            weight:0
        })
    }

    recordData = () => {
        this.props.navigation.goBack();
    }

    render(){
        return (
            <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
                <View style = {styles.formContainer}>
                    <Text style={styles.title}>Welcome to LevelUpLife</Text>
                    <View style = {styles.ageFormContainer}>
                        <TextInput
                            placeholder = "Test"
                            returnKeyType = "next"
                            onChangeText={(name)=>this.setState({name})}
                            style = {styles.input}
                            autoCapitalize = "words"
                            autoCorrect = {false}
                        />
                    </View>
                    <View style={{ borderRadius:  20 ,width:  120, height:  50, alignSelf: 'center'  , marginBottom:  20, backgroundColor:  'white' , borderWidth:  2, justifyContent:  'center', textAlign:  'center', margin:  10}}>
                        <Button
                            title = "Next"
                            color = "#3C6435"
                            onPress={() => this.recordData()}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#BCF4F5',
    },

    logoContainer : {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    title : {
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