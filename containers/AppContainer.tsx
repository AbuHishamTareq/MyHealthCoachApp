import { View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoard from '../app/screen/Onboard';
import Login from '../app/screen/Login';
import ForgetPassword from '../app/screen/ForgetPassword';

var Stack = createStackNavigator();

export function AppContainer({ onboarded }: any) {
  return (
    <>
        <Stack.Navigator initialRouteName={onboarded ? 'Login' : 'Onboard'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboard' component={OnBoard} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forget Password" component={ForgetPassword} />
        </Stack.Navigator>
    </>
  )
}