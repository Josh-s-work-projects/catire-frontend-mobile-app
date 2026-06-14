import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, Switch, Alert, Modal, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../../../../shared/store/cart.store';
import { useOrdersStore } from '../../../../orders/store/orders.store';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { styles } from '../styles/cart.styles';
import { CartItemAccordion } from '../components/CartItemAccordion';

export const CartScreen = () => {
  const navigation = useNavigation<any>();

  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { addOrder, actionLoading, clearOrdersError } = useOrdersStore();
  const { token } = useAuthStore();

  const [isDelivery, setIsDelivery] = useState(false);
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState({
    street: '', avenue: '', house_number: '', reference: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmOrder = async () => {
    if (!token) return Alert.alert('Error', 'Sesión expirada o no iniciada');
    if (items.length === 0) return Alert.alert('Error', 'El carrito está vacío');

    if (isDelivery) {
      if (!address.street || !address.avenue || !address.house_number) {
        return Alert.alert('Error', 'Faltan campos obligatorios en la dirección');
      }
    }

    const orderPayload: any = {
      is_delivery: isDelivery,
      notes: notes || undefined,
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        base_price: item.base_price,
        features: item.features
      })),
      ...(isDelivery && {
        address: {
          street: Number(address.street),
          avenue: Number(address.avenue),
          house_number: Number(address.house_number),
          reference: address.reference || undefined,
        }
      })
    };

    await addOrder(token, orderPayload);
    const currentError = useOrdersStore.getState().error;

    if (currentError) {
      Alert.alert('Error al crear orden', currentError);
      clearOrdersError();
    } else {
      clearCart();
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigation.navigate('Orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu Carrito</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.cart_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItemAccordion 
            item={item} 
            updateQuantity={updateQuantity} 
            removeItem={removeItem} 
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay productos en el carrito</Text>}
      />

      {items.length > 0 && (
        <View style={styles.checkoutSection}>
          <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>¿Es para Delivery?</Text>
            <Switch value={isDelivery} onValueChange={setIsDelivery} />
          </View>

          {isDelivery && (
            <View style={styles.addressForm}>
              <TextInput style={styles.input} placeholder="Calle (Solo números)" keyboardType="numeric" value={address.street} onChangeText={(t) => setAddress({ ...address, street: t })} />
              <TextInput style={styles.input} placeholder="Carrera (Solo números)" keyboardType="numeric" value={address.avenue} onChangeText={(t) => setAddress({ ...address, avenue: t })} />
              <TextInput style={styles.input} placeholder="Nro de casa (Solo números)" keyboardType="numeric" value={address.house_number} onChangeText={(t) => setAddress({ ...address, house_number: t })} />
              <TextInput style={styles.input} placeholder="Referencia (Opcional)" value={address.reference} onChangeText={(t) => setAddress({ ...address, reference: t })} />
            </View>
          )}

          <TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Notas del pedido (Opcional)" value={notes} onChangeText={setNotes} />

          <TouchableOpacity style={[styles.confirmBtn, actionLoading && styles.confirmBtnDisabled]} onPress={handleConfirmOrder} disabled={actionLoading}>
            {actionLoading ? <ActivityIndicator color="white" /> : <Text style={styles.confirmBtnText}>Confirmar Orden</Text>}
          </TouchableOpacity>
        </View>
      )}

      {/* MODAL DE ÉXITO */}
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.modalTitle}>¡Orden Creada!</Text>
            <Text style={styles.modalMessage}>Un empleado debe confirmar la orden y el estado se actualizará automáticamente en tu historial.</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={handleCloseModal}>
              <Text style={styles.modalBtnText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};