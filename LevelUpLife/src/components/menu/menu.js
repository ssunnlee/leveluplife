import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image, ScrollView } from 'react-native';
import { userIntakeHelper, getSummary } from '../firebase/firebaseConfig'
import { UserContext } from '../../../UserContext';
import { getAuth } from "firebase/auth";
//import { getEdamamData } from "../firebase/recipeAPI";


export default class Menu extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props)
        this.state = {
            summary: {
                threeRecipesData: [{ label: "", image: "" }]
            },
            user: null,
            loaded: false
        }
        //const user = this.context.user;
        const auth = getAuth();
        this.state.user = auth.currentUser;
        /* await getSummary(user.uid).then((summary) => {
            this.state.summary = summary;
            console.log("summary", summary);
        }).catch((error) => {
            console.log(error.code, error.message);
        }).finally(() => console.log("what"))
        console.log("uid is", user.uid);
        this.recordSummary(user.uid).then(() => {
            console.log("this is important", this.state.summary.threeRecipesData);
            console.log("this is important1", this.state.summary.threeRecipesData[0].image);
        }); */
    }

    recordSummary = async () => {
        this.state.summary = await getSummary(this.state.user.uid);
        this.state.loaded = true;
    }

    recordData = () => {
        const user = this.context.user;
        Alert.alert("Notification", "Menu");
    }

    nextItem = () => {
    }

    componentDidMount() {
        this.recordSummary();
    }

    render() {

        //await this.recordSummary(this.state.user.uid);
        //console.log("this is important1", this.state.summary.threeRecipesData[0].image);
        return (
            < ScrollView behavior="padding" style={styles.container} >
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recommended Menus</Text>
                    <View style={styles.InfoFormContainer}>
                        <Text style={styles.info}>{this.state.summary.threeRecipesData[0].label}</Text>
                        <Text style={styles.info}>{this.state.summary.threeRecipesData[0].ingredientString}</Text>
                        <Image style={styles.sampleImage} source={{ uri: 'https://www.kitchensanctuary.com/wp-content/uploads/2021/09/How-to-cook-the-perfect-steak-tall-FS.webp' }}></Image>
                        <Image style={styles.sampleImage} source={{ uri: this.state.summary.threeRecipesData[0].image }}></Image>
                    </View>
                    <View style={{ borderRadius: 20, width: 120, height: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: 'white', borderWidth: 2, justifyContent: 'center', textAlign: 'center', margin: 10 }}>
                        <Button
                            title="Next"
                            color="#3C6435"
                            onPress={() => this.nextItem()}
                        />
                    </View>
                </View>
            </ScrollView >
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