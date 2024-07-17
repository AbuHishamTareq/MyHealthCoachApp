import { View, Text, Platform, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Home from '../screen/Home';
import Reports from '../screen/Reports';
import Records from '../screen/Records';
import Chat from '../screen/Chat';
import Profile from '../screen/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import Rbs from '../screen/Rbs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RbsDetails from '../screen/RbsDetails';
import Weight from '../screen/Weight';
import WeightDetails from '../screen/WeightDetails';
import Bp from '../screen/Bp';
import BpDetails from '../screen/BpDetails';
import Steps from '../screen/Steps';
import { styles } from 'react-native-gifted-charts/src/Components/AnimatedThreeDBar/styles';
import ChatRoom from '../screen/ChatRoom';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const RecordsTab = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <Tab.Screen
                name="Records"
                component={Records}
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name="slideshare" size={28} color={ focused ? '#1C8DD0' : '#CCC'} />
                                <Text style={{ fontSize: 14, color: focused ? '#1C8DD0' : '#CCC' }}>Records</Text>
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
                name="Home"
                component={Home}
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
                                    elevation: 5,
                                    borderWidth: 3,
                                    borderColor: '#fff'
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

export default function TabNavigation() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name='RecordsTab' component={RecordsTab} options={{ headerShown: false }} />
            <Stack.Screen name='Rbs' component={Rbs}
                options={{ 
                    presentation: 'modal', 
                    headerBackImage: () =>  (<Ionicons name="close" size={24} color="white" />),
                    title: 'Sugar Blood Level',
                    headerTitleAlign: 'center',
                    headerStyle: { 
                        backgroundColor: '#FF525C',
                     },
                    headerTitleStyle: {
                        color: '#fff'
                    },
                    headerRight: () => (
                        //@ts-ignore
                        <TouchableOpacity onPress={() => { navigation.navigate('RbsDetails') }}>
                            <MaterialCommunityIcons name="file-document-multiple-outline" size={30} color="white" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                      ),
                }} />
            <Stack.Screen name='RbsDetails' component={RbsDetails}  options={{ 
                presentation: 'modal', 
                headerBackImage: () =>  (<Ionicons name="close" size={24} color="white" />),
                title: 'Sugar Blood Level',
                headerTitleAlign: 'center',
                headerStyle: { 
                    backgroundColor: '#FF525C',
                    },
                headerTitleStyle: {
                    color: '#fff'
                },
            }} />
            <Stack.Screen name='Weight' component={Weight}
                options={{ 
                    presentation: 'modal', 
                    headerBackImage: () =>  (<Ionicons name="close" size={24} color="black" />),
                    title: 'Weight',
                    headerTitleAlign: 'center',
                    headerStyle: { 
                        backgroundColor: '#18e6d1',
                     },
                    headerTitleStyle: {
                        color: '#000'
                    },
                    headerRight: () => (
                        //@ts-ignore
                        <TouchableOpacity onPress={() => { navigation.navigate('WeightDetails') }}>
                            <MaterialCommunityIcons name="file-document-multiple-outline" size={30} color="black" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                      ),
                }} />
            <Stack.Screen name='WeightDetails' component={WeightDetails}  options={{ 
                presentation: 'modal', 
                headerBackImage: () =>  (<Ionicons name="close" size={24} color="#000" />),
                title: 'Weight',
                headerTitleAlign: 'center',
                headerStyle: { 
                    backgroundColor: '#18e6d1',
                    },
                headerTitleStyle: {
                    color: '#000'
                },
            }} />
            <Stack.Screen name='Bp' component={Bp}
                options={{ 
                    presentation: 'modal', 
                    headerBackImage: () =>  (<Ionicons name="close" size={24} color="white" />),
                    title: 'Blood Pressure',
                    headerTitleAlign: 'center',
                    headerStyle: { 
                        backgroundColor: '#9D80FF',
                     },
                    headerTitleStyle: {
                        color: '#fff'
                    },
                    headerRight: () => (
                        //@ts-ignore
                        <TouchableOpacity onPress={() => { navigation.navigate('BpDetails') }}>
                            <MaterialCommunityIcons name="file-document-multiple-outline" size={30} color="white" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                      ),
                }} />
            <Stack.Screen name='BpDetails' component={BpDetails}  options={{ 
                presentation: 'modal', 
                headerBackImage: () =>  (<Ionicons name="close" size={24} color="white" />),
                title: 'Blood Pressure',
                headerTitleAlign: 'center',
                headerStyle: { 
                    backgroundColor: '#9D80FF',
                    },
                headerTitleStyle: {
                    color: '#fff'
                },
            }} />
            <Stack.Screen name='Steps' component={Steps}
                options={{
                    headerTitleAlign: 'center',
                    presentation: 'modal', 
                    headerBackImage: () =>  (<Ionicons name="close" size={24} color="white" />),
                    title: 'Steps',
                    headerStyle: {
                        backgroundColor: '#5379FE',
                        elevation: 0,
                        shadowOpacity: 0
                     },
                    headerTitleStyle: {
                        color: '#fff'
                    },
                    headerRight: () => (
                        //@ts-ignore
                        <TouchableOpacity onPress={() => { navigation.navigate('BpDetails') }}>
                            <MaterialCommunityIcons name="file-document-multiple-outline" size={30} color="white" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                      ),
                }} />
            <Stack.Screen name='ChatRoom' component={ChatRoom} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}