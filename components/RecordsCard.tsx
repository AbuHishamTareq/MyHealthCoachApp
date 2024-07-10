import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function RecordsCard({item}: any) {
    const navigation = useNavigation();
  return (
    <View style={ styles.container }>
        <TouchableWithoutFeedback onPress={()=> {
            // @ts-ignore
            navigation.navigate(item.link, {
                bgColor: item.iconBackgroundColor    
            });
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View style= {{ backgroundColor: item.iconBackgroundColor,
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                borderRadius: 10, 
                                height: 75, 
                                width: 55,
                                zIndex: 1 }}>
                    <Image source={ item.icon } style={{ width: 40, height: 40 }} resizeMode='contain' />
                </View>
                <View style={{width: '91%',
                            marginLeft: -30,
                            marginBottom: 5,
                            height: 130,
                            marginTop: -15,
                            borderRadius: 15,
                            backgroundColor: '#fff',
                            shadowColor: "#000",
                            shadowOffset: {
                                    width: 0,
                                    height: 10,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            
                    }}>
                    <View style={{ padding: 10, marginLeft: 40 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: '#aeaeae' }}>{moment().utcOffset('+3:00').format('DD MMMM, yyyy A hh:mm')}</Text>
                    </View>
                    <View style={{ borderWidth: 0.7, backgroundColor: '#d8d8d8', marginLeft: 50, marginRight: 15, marginVertical: 15, borderColor: '#d8d8d8' }}></View>
                    <View style={{ justifyContent: 'center', width: '91%', flexDirection: 'row' }}>
                        <Text style={{ color:item.iconBackgroundColor, fontSize: 18, fontWeight: 'bold' }}>{item.value}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10 }}>{item.unit}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    }
})