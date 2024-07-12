import React, { useState } from 'react';
import { View, useWindowDimensions, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';


import Value from '../../components/Value';
import useHealthData from '../../hooks/useHealthData';

export default function Steps({route}: any) {
    const [date, setDate] = useState(new Date());
  const layout = useWindowDimensions();
  const { bgColor } = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'daily', title: 'Daily' },
    { key: 'weekly', title: 'Weekly' },
    { key: 'monthly', title: 'Monthly' },
  ]);

  const {steps, distance, calories} = useHealthData(date);

  const DailyRoute = () => (
    <View style={{ flex: 1, backgroundColor: bgColor , justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ flexDirection: 'row' }}>
            <Text style= {{ color: '#fff', fontSize: 30 }}>{(steps !== 0) ? steps.toString() : '--'}</Text>
            <Text style= {{ color: '#fff', marginTop: 15, marginLeft: 5 }}>Steps</Text>
        </View>
        <Text style= {{ color: '#fff' }}>{moment().utcOffset('+03:00').format('DD MMMM, YYYY, ddd')}</Text>
    </View>
  );
  
  const WeeklyRoute = () => (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }} >
      <Text style= {{ color: '#fff' }}>Weekly!</Text>
    </View>
  );
  
  const MonthlyRoute = () => (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }} >
        <Text style= {{ color: '#fff' }}>Monthly!</Text>
    </View>
    );
  
  const renderScene = SceneMap({
    daily: DailyRoute,
    weekly: WeeklyRoute,
    monthly: MonthlyRoute,
  });

  return (
    <>
    <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: bgColor }}
                renderTabBar={props => <TabBar {...props} 
                    style={{ backgroundColor: bgColor, elevation: 0, shadowOpacity: 0 }} 
                    indicatorStyle={{ backgroundColor: '#fff' }}
                    pressColor={bgColor} />}
    />
    <ScrollView style={{ height: '25%' }}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff', height: 150, justifyContent: 'center', alignItems: 'center' }}>
            <Value image={ require('../../assets/images/distance.png') } backgroundColor={ bgColor } unit='M' value= {distance} />
            <Value image={ require('../../assets/images/kcal.png') } backgroundColor={ bgColor } unit='kCal' value= {calories} />
            <Value image={ require('../../assets/images/clock.png') } backgroundColor={ bgColor } unit='Minutes' value= {0} />
        </View>
        <View style={{ backgroundColor: '#fff',  marginTop: 10 }}>
            <View style={{ margin: 15, padding: 10, height: 200, backgroundColor: '#ffdcde', borderRadius: 10, borderWidth: 1, borderColor: bgColor }}>
                <Text style={{ fontWeight: 'bold', color: bgColor  }}>Learn about Suger Blood Level</Text>
                <View style={{ margin: 10, flexShrink: 1 }}>
                    <Text style={{ color: bgColor  }}>Normel Suger blood Level</Text>
                    <View> 
                        <Text style={{ color: bgColor  }}>The expected values for normal fasting blood glucose concentration are between 70 mg/dL (3.9 mmol/L) and 100 mg/dL (5.6 mmol/L). When fasting blood glucose is between 100 to 125 mg/dL (5.6 to 6.9 mmol/L) changes in lifestyle and monitoring glycemia are recommended.</Text>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
    </>
  );
}