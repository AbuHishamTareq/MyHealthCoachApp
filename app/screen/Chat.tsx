import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Chat() {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Chat</Text>
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