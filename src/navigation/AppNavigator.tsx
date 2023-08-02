import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Chat from '../screens/Chat';
import SignUp from '../screens/SignUp';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={'Signup'}
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Main'}
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
