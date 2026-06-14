import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth.store';
import { useCartStore } from '../store/cart.store';
import { useOrdersStore } from '../../modules/orders/store/orders.store';
import { styles } from '../styles/navbar.styles';
import { theme } from '../styles/theme';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<any>();
  
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { orders } = useOrdersStore(); 

  const insets = useSafeAreaInsets();
  const totalItems = getTotalItems();
  
  const totalOrders = orders?.length || 0; 

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
        <TouchableOpacity
          onPress={() => navigation.navigate('BranchesMap')}
        >
          <Image 
            source={require('@assets/logo.png')}
            style={styles.logo} 
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <TouchableOpacity 
            style={styles.cartButton} 
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.menuIconText}>🛒</Text>
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setIsMenuOpen(true)}
          >
            <Text style={styles.menuIconText}>☰</Text>
            {totalOrders > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.colors.secondary }]}>
                <Text style={styles.badgeText}>{totalOrders}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('BranchesMap')}
              >
                <Image 
                  source={require('@assets/logo.png')} 
                  style={styles.drawerLogo} 
                  resizeMode="contain"
                />
              </TouchableOpacity>
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
                style={[styles.drawerItem, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} 
                onPress={() => handleNavigation('Orders')}
              >
                <Text style={styles.drawerItemText}>Mis ordenes</Text>
                {totalOrders > 0 && (
                  <View style={{ backgroundColor: theme.colors.secondary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 12 }}>{totalOrders}</Text>
                  </View>
                )}
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