import React, { useEffect, useState, useRef } from 'react';
import { AppState, AppStateStatus, LogBox } from 'react-native';
import AppQueryProvider from './src/app/shared/providers/QueryProvider';
import MainNavigator from './src/app/navigation/MainNavigator';
import { useAuthStore } from './src/app/shared/store/auth.store';
import { useOrdersStore } from './src/app/modules/orders/store/orders.store';
import { LoadingScreen } from './src/app/shared/components/LoadingScreen';


const AppContent = () => {
  const token = useAuthStore((s) => s.token);
  const { fetchOrders } = useOrdersStore(); 
  
  const [isAppReady, setIsAppReady] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (token) {
        try {
          console.log('🔄 Sincronizando datos vitales en el arranque...');
          await fetchOrders(token); 
        } catch (error) {
          console.error('Error en sincronización inicial:', error);
        }
      }
      setIsAppReady(true);
    };

    bootstrapAsync();
  }, [token]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('📱 App activa nuevamente. Refrescando datos silenciosamente...');
        if (token) {
          try {
            await fetchOrders(token);
          } catch (error) {
            console.error('Error sincronizando desde background:', error);
          }
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [token]);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return <MainNavigator />;
};

export default function App() {
  return (
    <AppQueryProvider>
      <AppContent />
    </AppQueryProvider>
  );
}