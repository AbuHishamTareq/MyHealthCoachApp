import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { getWeightDetailsFromAPI } from '../../services/AuthService';
import moment from 'moment';

export default function RbsDetails() {
    const [weightDetails, setWeightDetails] = useState([])
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
        async function getWeightDetail() {
            const weightDetailsInfo = await getWeightDetailsFromAPI(user.id);
            setWeightDetails(weightDetailsInfo);
        }

        getWeightDetail();
    }, []);

    return (
        <View style={{ padding: 15 }}>
        <FlatList
            data={weightDetails}
            renderItem={({item}: any)=> 
                <View style={{ flexDirection: 'row', borderBottomWidth:0.5, marginBottom: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#18e6d1', fontWeight: 'bold', fontSize: 25 }}>{item.weight}</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>kg </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>/</Text>
                        <Text style={{ color: '#18e6d1', fontWeight: 'bold', fontSize: 25 }}> {item.bmi}</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>kg/m2</Text>
                    </View>
                    <View style={{ flex: 1, alignItems:'flex-end' }}>
                        <Text>{moment(item.created_at).utcOffset('+3:00').format('DD/MM')}</Text>
                        <Text>{moment(item.created_at).utcOffset('+3:00').format('hh:mm A')}</Text>
                    </View>
                </View>
            }
        />
        </View>
    )
}

const styles = StyleSheet.create({})