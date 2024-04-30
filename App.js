import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogInScreen from './screens/LogInScreen';
import WeightTrackingScreen from './screens/WeightTrackingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>

      <StatusBar style="auto" />
    <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
          <Stack.Screen name="WeightTracking" component={WeightTrackingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
