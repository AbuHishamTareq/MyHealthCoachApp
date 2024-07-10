import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { getRbsDetailsFromAPI } from '../../services/AuthService';
import moment from 'moment';

export default function RbsDetails() {
    const [rbsDetails, setRbsDetails] = useState([])
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
        async function getRbsDetail() {
            const rbsDetailsInfo = await getRbsDetailsFromAPI(user.id);
            setRbsDetails(rbsDetailsInfo);
        }

        getRbsDetail();
    }, []);

    return (
        <View style={{ padding: 15 }}>
        <FlatList
            data={rbsDetails}
            renderItem={({item}: any)=> 
                <View style={{ flexDirection: 'row', borderBottomWidth:0.5, marginBottom: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#ff525c', fontWeight: 'bold', fontSize: 25 }}>{item.rbs}</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>mg/dL</Text>
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