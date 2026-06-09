import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import catalogApi from '../../../api/catalog.api';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { Menu } from '../../../../../core/types';

export default function MenuList() {
	const route = useRoute();
	// @ts-ignore
	const { branchId } = route.params || {};
	const { data: menus = [], isLoading } = useQuery(['menus', branchId], () => catalogApi.getMenus(branchId));
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, padding: 12 }}>
			<Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Menus</Text>
			{isLoading && <Text>Loading...</Text>}
			<FlatList
				data={menus}
				keyExtractor={(item: Menu) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate('ProductsList' as never, { menuId: item.id, menuName: item.name } as never)} style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
						<Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
