import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import RegisterForm from '../forms/RegisterForm';

export default function Register() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFDFD' }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Create account</Text>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}
