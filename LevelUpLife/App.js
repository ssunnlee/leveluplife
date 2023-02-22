import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import Age from './src/components/age/age';
import Home from './src/components/home/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const AppColor = "#FFB7C3";


/*
const AppStackNavigator = createStackNavigator(
{
  Age: {screen: Age, navigationOptions: {headerLeft: () => null}},
},

{
  initialRouteName: 'Age',

  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: AppColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
    },
  },
},
);
*/

const Stack = createStackNavigator()

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

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component = {Home}/>
      <Stack.Screen name="Register" component = {Age}/>
    </Stack.Navigator>
    </NavigationContainer>
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
