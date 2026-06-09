import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import LoginForm from '../forms/LoginForm';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FDFDFD' }}>
			<View style={{ padding: 24 }}>
				<Text style={{ fontSize: 28, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Catire Hot Dog</Text>
				<Text style={{ fontSize: 16, marginBottom: 24 }}>Welcome — sign in to continue</Text>
				<LoginForm />
				<TouchableOpacity onPress={() => navigation.navigate('Register' as never)} style={{ marginTop: 12 }}>
					<Text style={{ color: '#EC3137', fontWeight: '600' }}>Create an account</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
