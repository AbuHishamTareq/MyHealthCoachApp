import { Image, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthContext from '../../contexts/AuthContext';
import Toast from 'react-native-root-toast';
import { getRbsData, inserRbsResult } from '../../services/AuthService';
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { processData } from '../../utils/chartHelper';

export default function Rbs({route}: any) {
    const { bgColor } = route.params;
    const [patientRbs, setPatientRbs] = useState('');
    const rbsInputRef = createRef() as any;
    const { user }: any = useContext(AuthContext);
    const [chartData, setChartData] = useState<barDataItem[]>([]);

    async function saveData() {
        if(!patientRbs) {
            let toast = Toast.show('Please write your RBS test result', {
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
                const result = await inserRbsResult({
                    id: user.id,
                    patientRbs: patientRbs
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

                      setPatientRbs('');
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
            const rbsData = await getRbsData(user.id);
             //@ts-ignore
            setChartData(processData(rbsData));
        } catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    function handleSaveButton() {
        saveData();
    }

    function submitHandler () {
        Keyboard.dismiss;
        setPatientRbs('');
    }
    
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', backgroundColor: bgColor, height: 200 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={ require('../../assets/images/sugar-blood-level.png')} style={{ width: 100, height: 100, marginRight: 25 }} resizeMode='contain' />
                </View>
                <View style={{ marginRight: 35, paddingTop: 40 }}>
                    <TextInput 
                        placeholder='RBS goes here'
                        style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#fff', width: 180, textAlign: 'center' }}
                        onChangeText={(patientRbs) => { setPatientRbs(patientRbs) }}
                        autoCapitalize='none'
                        keyboardType="numeric"
                        placeholderTextColor='#fff'
                        ref={rbsInputRef}
                        onSubmitEditing={submitHandler}
                        blurOnSubmit={false}
                        returnKeyType="done"
                        value={patientRbs}
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