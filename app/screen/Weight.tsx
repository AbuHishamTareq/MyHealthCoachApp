import { Image, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthContext from '../../contexts/AuthContext';
import Toast from 'react-native-root-toast';
import { getWeightData, inserWeightResult } from '../../services/AuthService';
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { processData } from '../../utils/weightChartHelper';

export default function Weight({route}: any) {
    const { bgColor } = route.params;
    const [pWeight, setPWeight] = useState('');
    const weightInputRef = createRef() as any;
    const { user }: any = useContext(AuthContext);
    const [chartData, setChartData] = useState<barDataItem[]>([]);

    async function saveData() {
        if(!pWeight) {
            let toast = Toast.show('Please write your Weight', {
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
                const result = await inserWeightResult({
                    id: user.id,
                    pWeight: pWeight
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

                      setPWeight('');
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

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const weightData = await getWeightData(user.id)
             //@ts-ignore
            setChartData(processData(weightData));
        } catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    function handleSaveButton() {
        saveData();
    }

    function submitHandler () {
        Keyboard.dismiss;
        setPWeight('');
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', backgroundColor: bgColor, height: 200 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={ require('../../assets/images/weight-device-b.png')} style={{ width: 100, height: 100, marginRight: 20 }} resizeMode='contain' />
                </View>
                <View style={{ marginRight: 35, paddingTop: 40 }}>
                    <TextInput 
                        placeholder='Weight goes here'
                        style={{ color: '#000', borderBottomWidth: 1, borderBottomColor: '#000', width: 180, textAlign: 'center' }}
                        onChangeText={(pWeight) => { setPWeight(pWeight) }}
                        autoCapitalize='none'
                        keyboardType="numeric"
                        placeholderTextColor='#000'
                        ref={weightInputRef}
                        onSubmitEditing={submitHandler}
                        blurOnSubmit={false}
                        returnKeyType="done"
                        value={pWeight}
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
                <View style={{ margin: 15, padding: 10, height: 200, backgroundColor: '#e8fdfa', borderRadius: 10, borderWidth: 1, borderColor: bgColor }}>
                    <Text style={{ fontWeight: 'bold'  }}>Learn about Body Mass Index (BMI)</Text>
                    <View style={{ margin: 10, flexShrink: 1 }}>
                        <Text>Body Mass Index (BMI)</Text>
                        <View> 
                            <Text>Body Mass Index (BMI) is a person’s weight in kilograms divided by the square of height in meters. A high BMI can indicate high body fatness. BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.</Text>
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
                            noOfSections={4}
                            barWidth={12}
                            minHeight={2}
                            barBorderRadius={3}
                            spacing={20}
                            xAxisThickness={1}
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