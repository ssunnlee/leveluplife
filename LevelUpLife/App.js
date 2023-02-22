import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import Age from './src/components/age/age';
//import { createStackNavigator } from 'react-navigation-stack';
//import { createAppContainer } from 'react-navigation';

/*
const AppColor = "#FFB7C3";



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

const TempApp = createAppContainer(AppStackNavigator);
*/
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
    <Age></Age>
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
