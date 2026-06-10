import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import catalogApi from '../../../api/catalog.api';
import type { Branch } from '../../../../../shared/types';
import { useNavigation } from '@react-navigation/native';

export default function BranchList() {
	const { data: branches = [], isLoading } = useQuery(['branches'], catalogApi.getBranches);
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, padding: 12 }}>
			<Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Branches</Text>
			<TouchableOpacity onPress={() => navigation.navigate('BranchesMap' as never)} style={{ marginBottom: 12 }}>
				<Text style={{ color: '#EC3137', fontWeight: '600' }}>Open map</Text>
			</TouchableOpacity>
			{isLoading && <Text>Loading...</Text>}
			<FlatList
				data={branches}
				keyExtractor={(item: Branch) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate('MenuList' as never, { branchId: item.id } as never)} style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
						<Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
						{item.address && <Text style={{ color: '#666' }}>{item.address}</Text>}
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
