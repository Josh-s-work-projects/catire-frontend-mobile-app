import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth.store';
import { useCartStore } from '../store/cart.store';
import { useOrdersStore } from '../../modules/orders/store/orders.store';
import { useNotificationsStore } from '../store/notifications.store';
import { DrawerItem } from './DrawerItem';
import { styles } from '../styles/navbar.styles';
import { theme } from '../styles/theme';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { orders } = useOrdersStore();

  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotificationsStore();

  const totalItems = getTotalItems();
  const pendingOrdersCount = orders?.filter((o: any) => o.status === 'PENDING').length || 0;

  const handleNavigation = (route: string) => {
    setIsMenuOpen(false);
    setIsNotifOpen(false);
    navigation.navigate(route);
  };

  const role = user?.role?.name;

  const roleNavigation = () => {
    if (role === 'client') handleNavigation('BranchesMap');
    if (role === 'employee') handleNavigation('EmployeeOrders');
    if (role === 'admin') handleNavigation('AdminScreen');
  };

  const openNotifications = () => {
    setIsNotifOpen(true);
    markAllAsRead();
  };

  return (
    <>
      <View style={[styles.navContainer, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={roleNavigation}>
          <Image source={require('@assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.rightActions}>

          <TouchableOpacity style={styles.cartButton} onPress={openNotifications}>
            <Text style={styles.menuIconText}>🔔</Text>
            {unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

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

      <Modal visible={isNotifOpen} transparent animationType="fade" onRequestClose={() => setIsNotifOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeArea} activeOpacity={1} onPress={() => setIsNotifOpen(false)} />

          <View style={[styles.drawerContainer, { width: '85%', alignSelf: 'flex-end', backgroundColor: theme.colors.secondary, padding: 20, paddingTop: insets.top + 20 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notificaciones</Text>
              <TouchableOpacity onPress={clearNotifications}>
                <Text style={{ color: 'red', fontWeight: '500' }}>Limpiar</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.length === 0 ? (
                <Text style={{ color: '#555', textAlign: 'center', marginTop: 50 }}>
                  No tienes notificaciones recientes.
                </Text>
              ) : (
                notifications.map((notif) => (
                  <View
                    key={notif.id}
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderColor: '#eee',
                      backgroundColor: '#fef9e7',
                      borderRadius: 8,
                      marginBottom: 8
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>{notif.title}</Text>
                    <Text style={{ color: '#555', marginTop: 5, lineHeight: 20 }}>{notif.body}</Text>
                    <Text style={{ color: '#aaa', fontSize: 12, marginTop: 10 }}>
                      {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ORIGINAL: MODAL DEL MENU DRAWER */}
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
                <DrawerItem label="Panel de Control" onPress={() => handleNavigation('AdminScreen')} />
              )}

              <View style={{ flex: 1 }} />

              <DrawerItem
                label="Cerrar sesión"
                onPress={() => { setIsMenuOpen(false); logout?.(); }}
                isLogout
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};