import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { sendPasswordResetLink } from '../../services/AuthService';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');

    async function handleForgetPassword() {
        try {
            await sendPasswordResetLink(email);
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