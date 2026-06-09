import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../../../../core/store/auth.store';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
	const { control, handleSubmit, formState } = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { email: '', password: '' },
	});

	const login = useAuthStore((s) => s.login);

	const onSubmit = async (data: FormValues) => {
		try {
			await login(data.email, data.password);
		} catch (e) {
			// swallow for now
		}
	};

	return (
		<View style={{ padding: 16 }}>
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

			<Button title="Login" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
