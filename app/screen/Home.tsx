import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp  } from 'react-native-responsive-screen';
import AuthContext from '../../contexts/AuthContext';

import Card from '../../components/Card';
import { gethealthParameters } from '../../services/AuthService';
import Header from '../../components/Header';
import HealthTeam from '../../components/HealthTeam';
import { gethealthCoaches } from '../../services/AuthService';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';


export default function Home() {
  const { user }:any = useContext(AuthContext);
  const [healthParameters, setHealthParameters]:any = useState([]);
  const [currentDate, setCurrentDate]: any = useState();
  const [healthCoaches, setHealthCoaches]: any = useState();

  const heart = require('../../assets/images/heart.png');
  const bp = require('../../assets/images/bp.png');
  const bmi = require('../../assets/images/bmi.png');
  const rbs = require('../../assets/images/blood.png');
  const fat = require('../../assets/images/fire.png');
  const weight = require('../../assets/images/weight.png');

  const Label = ({children}:any) => <Text style={styles.label}>{children}</Text>;

  useFocusEffect(
    useCallback(()=> {
      let isActive = true;
      async function getData() {
        try {
          const healthParameters: any  = await gethealthParameters(user.id);
          if(isActive) {
            setHealthParameters(healthParameters);
          }
        } catch(error:any) {
          console.error(error.response.data.message);
        }
      };

      getData();

      return () => {
        isActive = false;
      }
    }, [user.id])
  )

  useEffect(()=> {
    async function getHealthCoachesData() {
      try {
        const healthCoaches: any  = await gethealthCoaches();
        setHealthCoaches(healthCoaches);
      } catch(e) {
        console.log(e);
      }
    }

    getHealthCoachesData();
  }, []);

  useFocusEffect(
    useCallback(()=> {
      const date = moment().utcOffset('+3:00').format('dddd MMMM, yyyy');
      setCurrentDate(date);
    }, [user.id])
  )

  const data =[
    {
        name: 'Heart Rate',
        status: healthParameters.heartRate,
        image: heart,
        lightColor: '#f8e4d9',
        color: '#fcf1ea',
        darkColor: '#fac5a4',
        unit: 'BPM'
    },
    {
        name: 'Blood Pressure',
        status: healthParameters.bp,
        image: bp,
        lightColor: '#d7f0f7',
        color: '#e8f7fc',
        darkColor: '#aceafc',
        unit: 'mm Hg'
    },
    {
        name: 'Body Mass Index',
        status: healthParameters.bmi,
        image: bmi,
        lightColor: '#dad5fe',
        color: '#e7e3ff',
        darkColor: '#8860a2',
        unit: 'kg/m2'
    },
    {
      name: 'Blood suger Level',
      status: healthParameters.rbs,
      image: rbs,
      lightColor: '#f8e4d9',
      color: '#d9b7c4',
      darkColor: '#a04c6c',
      unit: 'mg/dL'
    },
    {
        name: 'Recommended Weight',
        status: healthParameters.rWeight,
        image: weight,
        lightColor: '#d7f0f7',
        color: '#bfd5b4',
        darkColor: '#287404',
        unit: 'kg'
    },
    {
        name: 'Fat Percentage',
        status: healthParameters.fat,
        image: fat,
        lightColor: '#dad5fe',
        color: '#fac682',
        darkColor: '#f48c04',
        unit: '%'
    }
  ]

  return (
    <>
      <View style={styles.headerContainer}>
        <Header user={ user } age={healthParameters.age} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ marginHorizontal: wp(2), marginTop: 10 }}>
            <Label>Health Parameters {currentDate}:</Label>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                  data={data}
                  horizontal
                  renderItem={({ item, index }) => <Card data={item} key={index} />}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
        <View style={{ marginHorizontal: wp(2), marginTop: 30 }}>
          <Label>Our Care Team:</Label>
          <HealthTeam coaches = {healthCoaches} />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginVertical: hp(1.5)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})