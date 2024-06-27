import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Device from 'expo-device';
import { BASE_URL } from '@env'
import axios from 'axios';

export default function Login() {
  const animation = useRef(null);
  const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(true);
  const [userUid, setUserUid] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const passwordInputRef = createRef() as any

  const toggolePassword = () => {
      setShowPassword(!showPassword);
  };

  const handleSignInButton = async () => {
      if(!userUid && !userPassword) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
        try {
          await axios.post(`${BASE_URL}/MyHealthCoachApp/api/login`, {
            userUid: userUid,
            userPassword: userPassword,
            deviceName: Device.modelName
          }, {
            headers: {
              Accept: 'application/json'
            }
          });
        } catch (e) {
          console.log(e.response.data);
        }
      }
  }
  return (
    <LinearGradient
        style={ styles.background }
        locations={[0, 0.45, 1]}
        colors={["#BAECF9", "#FFF", "#BAECF9"]}
      >
        <Image
          style={styles.waves}
          resizeMode="cover"
          source={require("../../assets/images/waves.png")}
        />
      
        <SafeAreaView style={ styles.container }>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
              <LottieView
                autoPlay
                loop
                ref={animation}
                style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 2 }}
                source={require('../../assets/animation/login.json')}
            />
          </View>
          <View style={{ flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>
            <AntDesign name="idcard" size={24} color="rgba(0,0,0, 0.3)" style={{ marginRight: 15 }} />
            <TextInput
              placeholder='ID / Iqama No.'
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType='number-pad'
              placeholderTextColor='rgba(0,0,0, 0.3)'
              onChangeText={(userUid) => {
                if(!userUid) {
                  setDisableButton(true)
                  return
                }

                setUserUid(userUid)}
              }
              returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
            />
          </View>
          <View style={{ flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>
              <SimpleLineIcons name="lock" size={24} color="rgba(0,0,0, 0.3)" style={{ marginRight: 15 }} />
              <TextInput 
                placeholder='Enter your password'
                style={{ flex: 1, paddingVertical: 0 }}
                onChangeText={(userPassword) => {
                  if(!userPassword) {
                    setDisableButton(true)
                    return
                  }

                  setUserPassword(userPassword)
                  setDisableButton(false)
                }}
                secureTextEntry={showPassword}
                autoCapitalize='none'
                keyboardType="default"
                placeholderTextColor='rgba(0,0,0, 0.3)'
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                returnKeyType="next"
              />
              <TouchableOpacity onPress={toggolePassword}>
                  {
                      showPassword ? <Feather name="eye" size={24} color="rgba(0,0,0, 0.3)" /> : <Feather name="eye-off" size={24} color="rgba(0,0,0, 0.3)" />
                  }
              </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {}} style={{ marginBottom: 20, alignItems: 'flex-end' }}>
              <Text style={{ color: '#1D8ED1', fontWeight: '700' }}>Forget Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableButton}
            style={!disableButton ? styles.enable : styles.disable}
            onPress={handleSignInButton}
          >
              <Text style={ !disableButton ? styles.enableText : styles.disableText}>SIGN IN</Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 25
    },
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    background: {
      height: '100%'
    },
  
    waves: {
      top: -355,
      left: 170,
      width: 547,
      height: 1489,
      opacity: 0.2,
      position: "absolute"
    },
  
    disable: {
      backgroundColor: 'lightgrey',
      padding: 8,
      borderRadius: 30,
      marginBottom: 10,
      marginTop: 5
    },
  
    enable: {
      backgroundColor: '#1C8DD0',
      padding: 8,
      borderRadius: 30,
      marginBottom: 10,
      marginTop: 5
    },
  
    disableText: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      color: 'grey'
    },
  
    enableText: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      color: '#FFF'
    }
})