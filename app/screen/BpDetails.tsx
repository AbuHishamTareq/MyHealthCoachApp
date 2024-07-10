import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { getBpDetailsFromAPI } from '../../services/AuthService';
import moment from 'moment';

export default function BpDetails() {
  const [bpDetails, setBpDetails] = useState([])
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
        async function getBpDetail() {
            const bpDetailsInfo = await getBpDetailsFromAPI(user.id);
            setBpDetails(bpDetailsInfo);
        }

        getBpDetail();
    }, []);

    return (
        <View style={{ padding: 15 }}>
        <FlatList
            data={bpDetails}
            renderItem={({item}: any)=> 
                <View style={{ flexDirection: 'row', borderBottomWidth:0.5, marginBottom: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#9d80ff', fontWeight: 'bold', fontSize: 25 }}>{item.bp_systolic}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>/</Text>
                        <Text style={{ color: '#9d80ff', fontWeight: 'bold', fontSize: 25 }}>{item.bp_distolic}</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>mm Hg</Text>
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