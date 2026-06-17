import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth.store';
import { useCartStore } from '../store/cart.store';
import { useOrdersStore } from '../../modules/orders/store/orders.store';
import { DrawerItem } from './DrawerItem';
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
  const pendingOrdersCount = orders?.filter((o: any) => o.status === 'PENDING').length || 0;

  const handleNavigation = (route: string) => {
    setIsMenuOpen(false);
    navigation.navigate(route);
  };

  const role = user?.role?.name;
  
  const roleNavigation = () => {
    if(role === 'client') handleNavigation('BranchesMap')
    if(role === 'employee') handleNavigation('EmployeeOrders')
    if(role === 'admin') handleNavigation('Admin')
  }

  return (
    <>
      <View style={[styles.navContainer, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={roleNavigation}>
          <Image source={require('@assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.rightActions}>
          {role === 'client' && (
            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.menuIconText}>🛒</Text>
              {totalItems > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{totalItems}</Text></View>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(true)}>
            <Text style={styles.menuIconText}>☰</Text>
            {pendingOrdersCount > 0 && role === 'client' && (
              <View style={[styles.badge, { backgroundColor: theme.colors.secondary }]}>
                <Text style={styles.badgeText}>{pendingOrdersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isMenuOpen} transparent animationType="fade" onRequestClose={() => setIsMenuOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeArea} activeOpacity={1} onPress={() => setIsMenuOpen(false)} />
          
          <View style={styles.drawerContainer}>
            <SafeAreaView style={styles.drawerHeader}>

              <TouchableOpacity onPress={roleNavigation}>
                <Image source={require('@assets/logo.png')} style={styles.drawerLogo} resizeMode="contain" />
              </TouchableOpacity>
              
              <Text style={styles.drawerUserText}>Hola, {user?.full_name}</Text>
            </SafeAreaView>

            <View style={styles.drawerBody}>
              <DrawerItem label="Mi perfil" onPress={() => handleNavigation('Profile')} />

              {role === 'client' && (
                <DrawerItem
                  label="Mis Órdenes"
                  onPress={() => handleNavigation('Orders')}
                  badgeCount={pendingOrdersCount > 0 ? orders?.length : 0}
                />
              )}

              {role === 'employee' && (
                <>
                  <DrawerItem label="Gestión de Menús" onPress={() => handleNavigation('MenuAdmin')} />
                  <DrawerItem label="Gestión de Productos" onPress={() => handleNavigation('ProductsAdmin')} />
                </>
              )}

              {/* Permisos de ADMIN */}
              {role === 'admin' && (
                <DrawerItem label="Panel de Control" onPress={() => handleNavigation('Admin')} />
              )}

              <View style={{ flex: 1 }} />

              <DrawerItem label="Cerrar sesión" onPress={() => { setIsMenuOpen(false); logout?.(); }} isLogout />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};