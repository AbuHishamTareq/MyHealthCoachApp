import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthContext from '../../contexts/AuthContext'
import Loader from '../../components/Loader';
import MessageCard from '../../components/MessageCard';
import { getChatData } from '../../services/AuthService';
import { useFocusEffect } from '@react-navigation/native';

export default function Chat() {
  const { user }: any = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function getData() {
        try {
            const chatData = await getChatData(user.id);
             //@ts-ignore
            if(isActive) {
              setChats(chatData);
              setIsLoading(false);
            }
        } catch (e: any) {
            console.log(e.response.data.message);
        }
      };

      getData();

      return () => {
        isActive = false;
      }
    }, [user.id])
  );

  return (
    <View style={ styles.container }>
      <SafeAreaView>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 16, paddingVertical: 8 }}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: 48, height:48}} resizeMode='contain' />
        </View>
        <ScrollView style={{ width: '100%', paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={{ width: '100%' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
              <Text style={{ color: '#555', fontSize: 16, lineHeight: 24, fontWeight: '800' }}>
                Users and Groups
              </Text>
            </View>
            {isLoading ? (
              <>
                <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader loading={isLoading} />
                </View>
              </>
            ) : (
              <>
                {chats && chats?.length > 0 ? (
                <>
                  {chats?.map((room) => (
                    //@ts-ignore
                    <MessageCard key={room.id} room={ room } />
                  ))}
                </>
              ) : (<></>)}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    }
})