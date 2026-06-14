import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderStatusType } from '../../../../../shared/api/enums';
import { styles } from '../styles/details.styles';

export const OrderDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const order = route.params?.order;

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>No se encontró la información de la orden.</Text>
      </SafeAreaView>
    );
  }

  const getStatusDisplay = (status: OrderStatusType) => {
    switch (status) {
      case 'PENDING':
        return { text: 'Pendiente', color: '#f39c12', bg: '#fdf1de' };
      case 'PROCESSING':
        return { text: 'En Preparación', color: '#9b59b6', bg: '#f5eef8' };
      case 'DELIVERED':
        return { text: 'Entregada', color: '#2ecc71', bg: '#eafaf1' };
      case 'CANCELLED':
        return { text: 'Cancelada', color: '#e74c3c', bg: '#fdedec' };
      case 'PAID':
        return { text: 'Pagada', color: '#197a41', bg: '#fdedec' };
      default:
        return { text: 'Desconocido', color: '#95a5a6', bg: '#f4f6f7' };
    }
  };

  const statusInfo = getStatusDisplay(order.status);
  const orderDate = new Date(order.created_at).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Cálculo del total de la orden
  const totalOrderPrice = order.items?.reduce((total: number, item: any) => {
    return total + (item.base_price * item.quantity);
  }, 0) || 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de Orden</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* TARJETA DE INFORMACIÓN GENERAL */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderId}>#{order.id.substring(0, 8).toUpperCase()}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
              <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.infoText}>📅 <Text style={styles.boldText}>Fecha:</Text> {orderDate}</Text>
            <Text style={styles.infoText}>
              🚚 <Text style={styles.boldText}>Tipo:</Text> {order.is_delivery ? 'Delivery' : 'Retiro en Local'}
            </Text>
            {order.is_delivery && order.address && (
              <View style={styles.addressBox}>
                <Text style={styles.addressTitle}>📍 Dirección de entrega:</Text>
                <Text style={styles.addressText}>Calle {order.address.street}, Carrera {order.address.avenue}</Text>
                <Text style={styles.addressText}>Nro de Casa: {order.address.house_number}</Text>
                {order.address.reference && (
                  <Text style={styles.addressText}>Ref: {order.address.reference}</Text>
                )}
              </View>
            )}
            {order.notes && (
              <Text style={styles.notesText}>📝 <Text style={styles.boldText}>Notas:</Text> {order.notes}</Text>
            )}
          </View>
        </View>

        {/* LISTA DE PRODUCTOS (ITEMS) */}
        <Text style={styles.sectionTitle}>Productos</Text>
        {order.items?.map((item: any, index: number) => (
          <View key={item.id || index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View style={styles.itemTitleRow}>
                <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                <Text style={styles.itemName}>{item.product?.name || `Producto #${item.product_id}`}</Text>
              </View>
              <Text style={styles.itemPrice}>${(item.base_price * item.quantity).toFixed(2)}</Text>
            </View>

            {item.features && item.features.length > 0 && (
              <View style={styles.featuresContainer}>
                {item.features.map((feature: any, idx: number) => {
                  if (!feature.value) return null;
                  const options = feature.value.split(',');
                  
                  return (
                    <View key={idx} style={styles.featureRow}>
                      <Text style={styles.featureName}>{feature.name_tag}:</Text>
                      <View style={styles.pillsContainer}>
                        {options.map((opt: string) => (
                          <View key={opt} style={styles.pill}>
                            <Text style={styles.pillText}>{opt}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}

      </ScrollView>

      {/* FOOTER FIJO CON TOTAL */}
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Pagado:</Text>
        <Text style={styles.totalAmount}>${totalOrderPrice.toFixed(2)}</Text>
      </View>

    </SafeAreaView>
  );
};