import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { sendPasswordResetLink } from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const { user }:any = useContext(AuthContext);

    async function handleForgetPassword() {
        try {
            await sendPasswordResetLink(user.id);
        } catch(e) {
            console.log(e);
        }
    }
  return (
    <View>
      <Text>ForgetPassword</Text>
      <Button title='E-mail reset password link' onPress={handleForgetPassword} />
    </View>
  )
}

const styles = StyleSheet.create({})