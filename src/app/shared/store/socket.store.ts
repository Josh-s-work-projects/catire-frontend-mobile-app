import * as Notifications from 'expo-notifications';
import { createAudioPlayer } from 'expo-audio';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from './auth.store';
import { useOrdersStore } from '../../modules/orders/store/orders.store';
import { useNotificationsStore } from './notifications.store';
import { Platform } from 'react-native';
import { IP } from '../constants/IP';
import { navigationRef } from '../../navigation/MainNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
});

export const useSocketManager = () => {
  const socketRef = useRef<Socket | null>(null);
  const url = process.env.EXPO_PUBLIC_API_URL || '';
  const api_url = url.replace('localhost', IP).replace('/api', '');

  const { token, user } = useAuthStore();
  const { receiveNewOrder, receiveOrderUpdate } = useOrdersStore();
  const { addNotification } = useNotificationsStore();

  const audioPlayer = useRef(createAudioPlayer(require('@assets/ding_sound.wav')));

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;

      if (data?.orderId) {
        navigationRef.current?.navigate('OrderDetails', {
          order: { id: data.orderId }
        });
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('catire-alerts', {
        name: 'Alertas de Pedidos',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'ding_sound.wav',
      });
    }

    if (!token || !user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    socketRef.current = io(api_url, {
      path: '/socket.io/',
      query: {
        userId: user.id.toString(),
        role: user.role.name,
      },
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    const triggerLocalNotification = async (title: string, body: string) => {
      try {
        if (audioPlayer.current) {
          audioPlayer.current.seekTo(0);
          audioPlayer.current.play();
        }
      } catch (error) {
        console.log('No se pudo reproducir el sonido con expo-audio:', error);
      }

      await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: true },
        trigger: null,
      });
    };

    socket.on('connect', () => {
      console.log('✅ ¡CONEXIÓN ESTABLECIDA CON EL SOCKET! ID:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión en el socket:', error.message);
      console.log('Intentando conectar a:', api_url);
    });

    socket.on('disconnect', (reason) => {
      console.warn('⚠️ Socket desconectado por la razón:', reason);
    });

    socket.on('order.created', (newOrder) => {
      console.log('🍕 [WS] Nueva orden recibida:', newOrder.id);
      receiveNewOrder(newOrder);

      if (user.role.name === 'employee' || user.role.name === 'admin') {
        const title = `¡Nueva Orden #${newOrder.id}!`;
        const body = `El cliente ${newOrder.user?.full_name || 'Desconocido'} acaba de hacer un pedido.`;

        triggerLocalNotification(title, body);
        addNotification({ title, body, orderId: newOrder.id });
      }
    });

    socket.on('order.updated', (updatedOrder) => {
      console.log('🔄 [WS] Orden actualizada:', updatedOrder.id);
      receiveOrderUpdate(updatedOrder);

      if (user.role.name === 'client') {
        const title = `Tu pedido #${updatedOrder.id}`;
        let body = updatedOrder.status;

        if (updatedOrder.status === 'PAID') body = '¡Ha sido verificado! Estamos preparando tu orden.';
        if (updatedOrder.status === 'PROCESSING') body = '¡Va en camino!';

        triggerLocalNotification(title, body);
        addNotification({ title, body, orderId: updatedOrder.id });
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log('❌ [WS] Conexión cerrada');
      }
    };
  }, [token, user]);
};