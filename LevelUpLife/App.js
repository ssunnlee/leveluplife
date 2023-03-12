import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import Info from './src/components/info/info';
import Home from './src/components/home/home';
import Index from './src/components/index/index';
import Login from './src/components/login/login';
import Register from './src/components/register/register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const AppColor = "#FFB7C3";



const Stack = createStackNavigator();

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
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Home" component={Home} />
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
