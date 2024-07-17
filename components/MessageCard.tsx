import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function MessageCard({ room }: any) {
    const navigation = useNavigation();

  return (
    // @ts-ignore
    <TouchableOpacity onPress={() => navigation.navigate('ChatRoom') } style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 16 }}>
        <View style={{ width: 50, height: 50, borderRadius: 99, display: 'flex', alignItems: 'center', borderWidth: 2, borderColor: '#1D8ED1', padding: 4, justifyContent: 'center' }}>
            <FontAwesome5 name='users' size={24} color='#555' />
        </View>
        <View style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 16 }}>
            <Text style={{ color: '#333', fontSize: 16, lineHeight: 24, fontWeight: '600', textTransform: 'uppercase' }}>{room.name}</Text>
            <Text style={{ color: '#555', fontSize: 14, lineHeight: 20 }}>{room.get_created_by.name}</Text>
        </View>
    </TouchableOpacity>
  )
}