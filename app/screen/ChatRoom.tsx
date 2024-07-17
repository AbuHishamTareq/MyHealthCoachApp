import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import { TextInput } from 'react-native-gesture-handler';

export default function ChatRoom() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', backgroundColor: '#1D8ED1', paddingHorizontal: 5, paddingVertical: 24, flex: 0.25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, paddingVertical: 30 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="chevron-left" size={32} color="#FBFBFB" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 50 }}>
                <View style={{ width: 48, height: 48, borderRadius: 99, borderWidth: 1, borderColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 15  }}>
                    <FontAwesome5 name='users' size={24} color='#FBFBFB' />
                </View>
                <View >
                    <Text style={{ color: '#F9FAFB', fontSize: 16, lineHeight: 16, fontWeight: '600', textTransform: 'uppercase' }}>Health Coach Group</Text>
                    <Text style={{ color: '#F9FAFB', fontSize: 16, lineHeight: 16, fontWeight: '600' }}>Online</Text>
                </View>
            </View>
        </View>
      </View>
      <View style={{ width: '100%', backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 24, borderRadius: 24, flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -40 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={120}>
            <>
                <ScrollView>
                    {isLoading ? (
                        <>
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Loader loading={isLoading} />
                            </View>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </ScrollView>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style= {{ backgroundColor: '#E5E7Eb', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput style={{ flex: 1, fontSize: 16, lineHeight: 24, color: '#555', fontWeight: '600' }}
                            placeholder='Type a message...'
                            placeholderTextColor='#999'
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>
                    <TouchableOpacity style={{ paddingLeft: 16 }}>
                        <FontAwesome name='send' size={24} color={'#555'} />
                    </TouchableOpacity>
                </View>
            </>
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}