import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

export default function Home() {
  const { user }:any = useContext(AuthContext);

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Welcome Home { user.name }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    }
})