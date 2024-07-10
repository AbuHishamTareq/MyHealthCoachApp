import { Image, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthContext from '../../contexts/AuthContext';
import Toast from 'react-native-root-toast';
import { getBpData, inserBpResult } from '../../services/AuthService';
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { processData } from '../../utils/BpChartHelper';

export default function Bp({route}: any) {
    const { bgColor } = route.params;
    const [systolic, setSystolic] = useState('');
    const [distolic, setDistolic] = useState('');
    const distolicInputRef = createRef() as any;
    const { user }: any = useContext(AuthContext);
    const [chartData, setChartData] = useState<barDataItem[]>([]);

    async function saveData() {
        if(!systolic) {
            let toast = Toast.show('Please write your systolic', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'darkred'
              });
        } else {
            if(!distolic) {
                let toast = Toast.show('Please write your distolic', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: 'darkred'
                  });
            } else {
                try {
                    const result = await inserBpResult({
                        id: user.id,
                        systolic: systolic,
                        distolic: distolic
                      });
    
                    if(result.status == 'success') {
                        let toast = Toast.show('Data saved successfully' , {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                            backgroundColor: '#013220'
                          });
    
                          setSystolic('');
                          setDistolic('')
                          getData();
                    }
                } catch (e: any) {
                    let toast = Toast.show(e.response.data.message , {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        backgroundColor: 'darkred'
                      });
                }
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const bpData = await getBpData(user.id)
             //@ts-ignore
            setChartData(processData(bpData));
        } catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    function handleSaveButton() {
        saveData();
    }

    function submitHandler () {
        Keyboard.dismiss;
        setSystolic('');
        setDistolic('');
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', backgroundColor: bgColor, height: 200 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={ require('../../assets/images/blood-pressure-meter.png')} style={{ width: 100, height: 100, marginRight: 20 }} resizeMode='contain' />
                </View>
                <View style={{ marginRight: 35, paddingTop: 40 }}>
                    <TextInput 
                        placeholder='systolic goes here'
                        style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#fff', width: 180, textAlign: 'center' }}
                        onChangeText={(systolic) => { setSystolic(systolic) }}
                        autoCapitalize='none'
                        keyboardType="numeric"
                        placeholderTextColor='#fff'
                        onSubmitEditing={ () =>
                            distolicInputRef.current &&
                            distolicInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        returnKeyType="next"
                        value={systolic}
                    />
                    <TextInput 
                        placeholder='dilostic goes here'
                        style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#fff', width: 180, textAlign: 'center', marginTop: 10 }}
                        onChangeText={(distolic) => { setDistolic(distolic) }}
                        autoCapitalize='none'
                        keyboardType="numeric"
                        placeholderTextColor='#fff'
                        ref={distolicInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        value={distolic}
                    />
                    <View>
                        <TouchableOpacity onPress={handleSaveButton} style={{ marginTop: 20 }}>
                            <View style={{ backgroundColor: '#1C8DD0', padding: hp(1.2), borderRadius: wp(5)}}>
                                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: wp(4.5), color: '#FFF' }} >Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff',  marginTop: 10 }}>
                <View style={{ margin: 15, padding: 10, height: 200, backgroundColor: '#f5f2ff', borderRadius: 10, borderWidth: 1, borderColor: bgColor }}>
                    <Text style={{ fontWeight: 'bold'  }}>Learn Blood Pressure</Text>
                    <View style={{ margin: 10, flexShrink: 1 }}>
                        <Text>Blood Pressure</Text>
                        <View> 
                            <Text>Blood pressure is measured in millimetres of mercury (mmHg) and is given as 2 numbers: systolic pressure – the pressure when your heart pushes blood out around your body. diastolic pressure – the pressure when your heart rests between beats and blood is pushed around your heart.</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff',  marginTop: 10 }}>
                <View style={{ paddingTop: 15, paddingLeft: 15, paddingBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Last 7 times trends</Text>
                    <View>
                        <BarChart
                            data={chartData}
                            isAnimated
                            noOfSections={5}
                            barWidth={8}
                            barBorderRadius={3}
                            spacing={24}
                            xAxisThickness={1}
                            xAxisTextNumberOfLines = {2}
                            yAxisThickness={0}
                            yAxisTextStyle={{ color: '#fff' }}
                            hideRules
                            height={140}
                            showGradient
                            width={250}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})