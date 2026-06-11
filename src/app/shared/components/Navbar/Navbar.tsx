import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './navbar.styles';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();

  const insets = useSafeAreaInsets();

  const handleNavigation = (route: string) => {
    setIsMenuOpen(false);
    navigation.navigate(route);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (logout) logout();
  };

  return (
    <>
      <View style={[styles.navContainer, { paddingTop: insets.top }]}>
        <Image 
          source={require('@assets/logo.png')}
          style={styles.logo} 
          resizeMode="contain"
        />

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setIsMenuOpen(true)}
        >
          <Text style={styles.menuIconText}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          
          <TouchableOpacity 
            style={styles.closeArea} 
            activeOpacity={1} 
            onPress={() => setIsMenuOpen(false)} 
          />

          <View style={styles.drawerContainer}>
            
            <SafeAreaView style={styles.drawerHeader}>
              <Image 
                source={require('@assets/logo.png')} 
                style={styles.drawerLogo} 
                resizeMode="contain"
              />
              <Text style={styles.drawerUserText}>Hola, {user?.full_name || 'Cliente'}</Text>
            </SafeAreaView>

            <View style={styles.drawerBody}>
              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => handleNavigation('Profile')}
              >
                <Text style={styles.drawerItemText}>Mi perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => handleNavigation('Orders')}
              >
                <Text style={styles.drawerItemText}>Mis ordenes</Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }} />

              <TouchableOpacity 
                style={[styles.drawerItem, styles.logoutItem]} 
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
};