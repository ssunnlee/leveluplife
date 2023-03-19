import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Button, TextInput, Alert, Image, ScrollView } from 'react-native';
import { initCounter, initThresholds, updateUserModel } from '../firebase/firebaseConfig'
import { UserContext } from '../../../UserContext';

export default class Menu extends Component {
    //static contextType = UserContext;
    constructor(props) {
        super(props)
    }

    recordData = () => {
        //const user = contextType.user;
        //initCounter(user.uuid);
        //initThresholds();
        Alert.alert("Notification", "Menu");

        //updateUserModel(user.uuid, name, age, height, weight, gender);
        //this.props.navigation.navigate("HomeStack");
    }

    render() {
        return (
            <ScrollView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recommended Menus</Text>
                    <View style={styles.InfoFormContainer}>
                        <Text style={styles.info}>Something</Text>
                        <Text style={styles.info}>More things</Text>
                        <Text style={styles.info}>blah blah blah</Text>
                        <Image style={styles.sampleImage} source={{uri:'https://www.kitchensanctuary.com/wp-content/uploads/2021/09/How-to-cook-the-perfect-steak-tall-FS.webp'}}></Image>
                    </View>
                    <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                        <Button
                            title="Next"
                            color="#3C6435"
                            onPress={() => this.recordData()}
                        />
                    </View>
                </View>
            </ScrollView>
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

    info: {
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 26,
    },

    InfoFormContainer: {
        marginTop: 50,
        padding: 20,
        alignContent: 'center'
    },

    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        color: '#000000',
        paddingHorizontal: 10
    },

    sampleImage: {
        marginTop: 10,
        width: 300,
        height: 300,
        justifyContent: 'center'
    },
});