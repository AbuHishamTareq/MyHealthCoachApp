import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { logout } from '../../services/AuthService';

export default function Profile() {
  const { user, setUser }:any = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ user.name } Profile</Text>
      <Button title='logout' onPress={handleLogout} />
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