import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { theme } from '../styles/theme';

const Logo = require('@assets/logo.png');

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
        contentFit="contain"
      />
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
  },
  logo: {
    width: 200,
    height: 200,
  },
  spinner: {
    marginTop: 30,
  }
});