import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCatalogStore } from '../../../store/catalog.store';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { Branch } from '../../../models/Branch';
import { styles } from '../styles/branch.styles';
import { CLEAN_MAP_STYLE } from '../constants/branch.maps';
import { theme } from '../../../../../shared/styles/theme';

export default function BranchesMap() {
  const navigation = useNavigation<any>();
  const token = useAuthStore((s) => s.token);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { branches, fetchBranches, loading } = useCatalogStore(); 
  
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    if (token && branches.length === 0) {
      fetchBranches(token);
    }
  }, [token, branches]);

  const initialLat = branches.length > 0 ? Number(branches[0].coordinates_lat) : 7.7667;
  const initialLng = branches.length > 0 ? Number(branches[0].coordinates_long) : -72.2333;

  return (
    <SafeAreaView style={styles.safeArea}>
      {
        loading && branches.length === 0 ? (
          <View style={styles.containerLoading}>
            <Text style={styles.headerLoading}>Cargando Sucursales</Text>
            <ActivityIndicator color={theme.colors.primary} size={50} />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.headerTitle}>Ubicaciones</Text>
            <Text style={styles.headerSubtitle}>Encuentra tu sucursal más cercana.</Text>
    
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={CLEAN_MAP_STYLE}
                initialRegion={{
                  latitude: initialLat,
                  longitude: initialLng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                onPress={() => setSelectedBranch(null)}
              >
                {branches.map((branch) => {
                  const lat = Number(branch.coordinates_lat);
                  const lng = Number(branch.coordinates_long);
    
                  if (isNaN(lat) || isNaN(lng)) return null;
    
                  return (
                    <Marker
                      key={branch.id}
                      coordinate={{ latitude: lat, longitude: lng }}
                      anchor={{ x: 0.5, y: 1 }} 
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedBranch(branch);
                      }}
                      tracksViewChanges={!isLoaded}
                    ></Marker>
                  );
                })}
              </MapView>
            </View>
    
            {selectedBranch && (
              <View style={[styles.cardShadow, styles.mapOverlayCard]}>
                <View style={styles.card}>
                  <Text style={styles.branchName}>{selectedBranch.name}</Text>
                  
                  <View style={styles.buttonShadow}>
                    <TouchableOpacity 
                      style={styles.buttonPrimary}
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate('MenuList', { branchId: selectedBranch.id })}
                    >
                      <Text style={styles.buttonTextPrimary}>VER MENÚ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

          </View>
        )
      }
    </SafeAreaView>
  );
}