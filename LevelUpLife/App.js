import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import React, { createContext, useState } from 'react';
import Info from './src/components/info/info';
import Intake from './src/components/intake/intake';
import Index from './src/components/index/index';
import Login from './src/components/login/login';
import Register from './src/components/register/register';
import UpdateInfo from './src/components/updateinfo/updateinfo';
import Menu from './src/components/menu/menu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './UserContext';



const AppColor = "#FFB7C3";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//const HomeStack = createBottomTabNavigator();

//function MyApp

//const TempApp = createAppContainer(AppStackNavigator);

/* export default class App extends Component {
    componentDidMount(){
      init();
    }
  render () {
    return (
      <h1>hello world</h1>
    );
  }
} */

function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Update Info" component={UpdateInfo} />
      <Tab.Screen name="Intake" component={Intake} />
      <Tab.Screen name="Recommended Menu" component={Menu} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeStack} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
