import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/admin.styles';

export const AdminScreen = () => {
  const navigation = useNavigation<any>();

  const modules = [
    { title: 'Usuarios', icon: '👥', route: 'UserAdmin' },
    { title: 'Sucursales', icon: '🏪', route: 'BranchAdmin' },
    { title: 'Menús', icon: '📋', route: 'MenuAdmin' },
    { title: 'Productos', icon: '🍔', route: 'ProductAdmin' },
    { title: 'Pedidos', icon: '🛵', route: 'OrderAdmin' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Administración</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.dashboardGrid}>
          {modules.map((mod, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.dashboardCard}
              onPress={() => navigation.navigate(mod.route)}
            >
              <Text style={styles.dashboardIcon}>{mod.icon}</Text>
              <Text style={styles.dashboardCardTitle}>{mod.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};