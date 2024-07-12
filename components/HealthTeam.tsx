import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'

type Props = {}

const HealthTeam = ({coaches}:any) => {
    const URL = 'http://192.168.1.15:8000/assets/admin/upload/'
    return (
        <View style={{ paddingVertical: 5 }}>
            <FlatList
                data={coaches}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderWidth: 2, borderRadius: 50, borderColor: 'lightgrey', margin: 5 }}>
                            <Image source={{ uri: URL + item.image_url }} style={{ width: 80, height: 80, borderRadius: 40 }} resizeMode='contain' />
                        </View>
                        <View style={{ flex: 1, width: 100, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
                            <Text style={{ fontSize: 10 }}>{item.specialist}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HealthTeam

const styles = StyleSheet.create({})