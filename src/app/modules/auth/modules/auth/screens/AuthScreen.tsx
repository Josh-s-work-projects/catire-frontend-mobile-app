import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { styles } from '../styles/auth.styles';
import { Image } from 'expo-image'
import { useCatalogStore } from '../../../../catalog/store/catalog.store';
import { useOrdersStore } from '../../../../orders/store/orders.store';
import { useFinanceStore } from '../../../../finance/store/finance.store';

const Logo = require('@assets/logo.png')

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    useCatalogStore.persist.clearStorage();
    useOrdersStore.persist.clearStorage();
    useFinanceStore.persist.clearStorage();
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.headerContainer}>
          <View style={styles.logoPlaceholder}>
            <Image
              source={Logo}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </View>
          <Text style={styles.subtitle}>DESDE 2003</Text>
        </View>

        <View style={styles.cardShadow}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {isLogin ? '¡BIENVENIDO DE VUELTA!' : '¡ÚNETE A LA FAMILIA!'}
            </Text>
            <Text style={styles.description}>
              {isLogin 
                ? 'Ingresa de forma segura para explorar las sucursales y pedir el menú.' 
                : 'Crea tu cuenta para disfrutar del mejor sabor criollo premium.'}
            </Text>

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? '¿AÚN NO TIENES CUENTA?' : '¿YA TIENES UNA CUENTA?'}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleLink}>
                  {isLogin ? 'REGÍSTRATE AQUÍ - ES GRATIS' : 'INICIA SESIÓN AQUÍ'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}