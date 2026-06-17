import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface Props {
  label: string;
  badgeCount?: number;
  onPress: () => void;
  isLogout?: boolean;
}

export const DrawerItem = ({ label, badgeCount = 0, onPress, isLogout = false }: Props) => (
  <TouchableOpacity style={[styles.item, isLogout && styles.logoutItem]} onPress={onPress}>
    <Text style={[styles.label, isLogout && styles.logoutText]}>{label}</Text>
    {badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  label: { fontSize: 16, color: theme.colors.dark, flex: 1 },
  badge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 12 },
  logoutItem: { borderBottomWidth: 0, marginTop: 20 },
  logoutText: { color: theme.colors.primary, fontWeight: 'bold' },
});