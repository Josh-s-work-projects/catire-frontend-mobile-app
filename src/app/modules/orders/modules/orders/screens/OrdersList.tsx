import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '../../../api/orders.api';
import type { Order } from '../../../../../core/types';

export default function OrdersList() {
	const { data: orders = [], isLoading } = useQuery(['orders'], ordersApi.listOrders);

	return (
		<View style={{ flex: 1, padding: 12 }}>
			<Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Orders</Text>
			{isLoading && <Text>Loading...</Text>}
			<FlatList
				data={orders}
				keyExtractor={(item: Order) => item.id}
				renderItem={({ item }) => (
					<View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
						<Text style={{ fontSize: 16, fontWeight: '600' }}>{item.id}</Text>
						<Text>Status: {item.status}</Text>
						<Text>Total: ${item.totalUSD.toFixed(2)}</Text>
					</View>
				)}
			/>
		</View>
	);
}
