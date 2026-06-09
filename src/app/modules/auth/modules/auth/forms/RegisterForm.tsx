import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import authApi from '../../../../api/auth.api';
import { useAuthStore } from '../../../../../core/store/auth.store';

const schema = z.object({
	full_name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
	dni: z.number().optional(),
	phone_1: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
	const { control, handleSubmit, formState } = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { full_name: '', email: '', password: '', dni: undefined, phone_1: '' },
	});

	const login = useAuthStore((s) => s.login);

	const onSubmit = async (data: FormValues) => {
		try {
			await authApi.register({ ...data, role_id: 1 });
			// auto-login after registration
			await login(data.email, data.password);
		} catch (e) {
			// handle error
		}
	};

	return (
		<View style={{ padding: 16 }}>
			<Controller
				control={control}
				name="full_name"
				render={({ field: { onChange, value } }) => (
					<TextInput placeholder="Full name" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
				)}
			/>
			{formState.errors.full_name && <Text style={{ color: 'red' }}>{String(formState.errors.full_name?.message)}</Text>}

			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value } }) => (
					<TextInput placeholder="Email" value={value} onChangeText={onChange} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
				)}
			/>
			{formState.errors.email && <Text style={{ color: 'red' }}>{String(formState.errors.email?.message)}</Text>}

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, value } }) => (
					<TextInput placeholder="Password" value={value} onChangeText={onChange} secureTextEntry style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
				)}
			/>
			{formState.errors.password && <Text style={{ color: 'red' }}>{String(formState.errors.password?.message)}</Text>}

			<Button title="Register" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
