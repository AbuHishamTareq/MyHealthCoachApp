import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import React, { createRef, useRef, useState, useContext } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Device from 'expo-device';
import { login, loadUser } from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';

export default function Login() {
  const { setUser }: any = useContext(AuthContext);
  const navigation:any = useNavigation();
  const animation = useRef(null);
  const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(true);
  const [userUid, setUserUid] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const passwordInputRef = createRef() as any;

  const toggolePassword = () => {
      setShowPassword(!showPassword);
  };

  const handleSignInButton = async () => {
      if(!userUid && !userPassword) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
        setLoading(true);
        try {
          await login({
            userUid,
            userPassword,
            deviceName: Device.modelName
          });

          const user = await loadUser();
          setUser(user);
        } catch (e:any) {
          setLoading(false);
          let toast = Toast.show(e.response.data.message, {
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

  return (
    <LinearGradient
        style={ styles.background }
        locations={[0, 0.45, 1]}
        colors={["#BAECF9", "#FFF", "#BAECF9"]}
      >
        <Loader loading={loading} />

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

                setUserUid(userUid)
                setDisableButton(false)
              }}
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
          <TouchableOpacity onPress={() => {navigation.navigate('Forget Password')}} style={{ marginBottom: 20, alignItems: 'flex-end' }}>
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