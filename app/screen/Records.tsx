import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import AuthContext from '../../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'

import { gethealthParameters } from '../../services/AuthService';
import RecordsCard from '../../components/RecordsCard'
import { FlatList } from 'react-native'

export default function Records() {
  const { user }: any = useContext(AuthContext);
  const [currentDate, setCurrentDate]: any = useState();
  const [healthParameters, setHealthParameters]:any = useState([]);

  useFocusEffect(
    useCallback(() => {
      const date = moment().utcOffset('+3:00').format('dddd MMMM, yyyy');
      setCurrentDate(date);
    }, [user.id])
  );

  useFocusEffect(
    useCallback(()=> {
      let isActive = true;
      async function getData() {
        try {
          const healthParameters: any  = await gethealthParameters(user.id);
          if(isActive) {
            setHealthParameters(healthParameters);
          }
        } catch(e) {
          console.log(e);
        }
      };

      getData();

      return () => {
        isActive = false;
      }
    }, [user.id])
  )

  const data: ArrayLike<any> | null | undefined = [
    {
      name: 'RBS',
      icon: require('../../assets/images/blood-drop.png'),
      iconBackgroundColor: '#ff525c',
      value: healthParameters.rbs ? healthParameters.rbs : '--',
      unit: 'mg/dL',
      link: 'Rbs'
    },
    {
      name: 'Blood Pressure',
      icon: require('../../assets/images/blood-pressure.png'),
      iconBackgroundColor: '#9d80ff',
      value: healthParameters.bp ? healthParameters.bp : '--/--',
      unit: 'mm Hg',
      link: 'Bp'
    },
    {
      name: 'Weight',
      icon: require('../../assets/images/weight-device.png'),
      iconBackgroundColor: '#18e6d1',
      value: healthParameters.weight ? healthParameters.weight : '--',
      unit: 'kg',
      link: 'Weight'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.title}>{currentDate}</Text>
          <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Today</Text>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ marginTop: 10 }}>Your opinion of yourself is the only one that truly matters.</Text>
        </View>
        <FlatList
          data = {data}
          renderItem={({ item, index }) => <RecordsCard item={item} key={index} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, paddingLeft: 15, paddingRight: 10 }}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
      paddingTop: 20
    },
    title: {
      fontSize: 13,
    }
})