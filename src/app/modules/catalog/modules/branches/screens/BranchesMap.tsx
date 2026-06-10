import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { useQuery } from '@tanstack/react-query';
import catalogApi from '../../../api/catalog.api';
import type { Branch } from '../../../../../shared/types';

export default function BranchesMap() {
	const { data: branches = [], isLoading } = useQuery<Branch[]>(['branches-map'], catalogApi.getBranches);
	const [region, setRegion] = useState<any | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status === 'granted') {
					const loc = await Location.getCurrentPositionAsync({});
					setRegion({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
					return;
				}
			} catch (e) {
				// ignore
			}

			// Fallback to first branch
			if (branches && branches.length > 0) {
				const b = branches[0];
				if (b.lat && b.lng) setRegion({ latitude: b.lat, longitude: b.lng, latitudeDelta: 0.02, longitudeDelta: 0.02 });
			}
		})();
	}, [branches]);

	if (isLoading || !region) return <ActivityIndicator style={{ flex: 1 }} />;

	return (
		<MapView provider={PROVIDER_GOOGLE} style={{ flex: 1 }} initialRegion={region} region={region}>
			{branches.map((b) => (
				// @ts-ignore
				<Marker key={b.id} coordinate={{ latitude: b.lat || 0, longitude: b.lng || 0 } as LatLng} title={b.name} description={b.address} onCalloutPress={() => {
					const url = Platform.select({
						ios: `maps:0,0?q=${b.lat},${b.lng}(${encodeURIComponent(b.name)})`,
						android: `geo:0,0?q=${b.lat},${b.lng}(${encodeURIComponent(b.name)})`,
					});
					if (url) Linking.openURL(url);
				}} />
			))}
		</MapView>
	);
}
