import React, { useEffect } from 'react';
import AppQueryProvider from './src/app/core/providers/QueryProvider';
import MainNavigator from './src/app/navigation/MainNavigator';
import { useAuthStore } from './src/app/core/store/auth.store';

export default function App() {
  const validate = useAuthStore((s) => s.validate);

  useEffect(() => {
    validate();
  }, []);

  return (
    <AppQueryProvider>
      <MainNavigator />
    </AppQueryProvider>
  );
}
