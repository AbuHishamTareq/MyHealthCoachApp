import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login';
import ForgetPassword from '../screen/ForgetPassword';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forget Password" component={ForgetPassword} />
    </Stack.Navigator>
  )
}