import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Home from '../screen/Home';
import Reports from '../screen/Reports';
import Records from '../screen/Records';
import Chat from '../screen/Chat';
import Profile from '../screen/Profile';

const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        postion: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: '#fff'
    }
}

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome5 name="home" size={28} color={ focused ? '#1C8DD0' : '#CCC'} />
                                <Text style={{ fontSize: 14, color: focused ? '#1C8DD0' : '#CCC' }}>Home</Text>
                            </View>
                        );}
                    }}
            />
            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome5 name="list" size={28} color={ focused ? '#1C8DD0' : '#CCC'} />
                                <Text style={{ fontSize: 14, color: focused ? '#1C8DD0' : '#CCC' }}>Reports</Text>
                            </View>
                        );}
                    }}
            />
            <Tab.Screen
                name="Records"
                component={Records}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#1C8DD0',
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius: Platform.OS == 'ios' ? 15 : 30,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                    width: 0,
                                    height: 10
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.5,
                                    elevation: 5
                                }}
                            >
                            <MaterialCommunityIcons name="heart-pulse" size={46} color="white" />
                            </View>
                        );}
                    }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialCommunityIcons name="chat-processing-outline" size={28} color={ focused ? '#1C8DD0' : '#CCC'} />
                                <Text style={{ fontSize: 14, color: focused ? '#1C8DD0' : '#CCC' }}>Chat</Text>
                            </View>
                        );}
                    }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome5 name="user-alt" size={28} color={ focused ? '#1C8DD0' : '#CCC'} />
                                <Text style={{ fontSize: 14, color: focused ? '#1C8DD0' : '#CCC' }}>Profile</Text>
                            </View>
                        );}
                    }}
            />
        </Tab.Navigator>
    )
}