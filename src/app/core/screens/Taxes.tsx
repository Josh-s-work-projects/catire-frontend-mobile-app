import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TAX_KEY = 'catire_taxes_v1';

const DEFAULT = { USD: 0.12, VES: 0.12, COP: 0.12 };

export default function Taxes() {
  const [rates, setRates] = useState<{ USD: number; VES: number; COP: number }>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(TAX_KEY);
        if (raw) setRates(JSON.parse(raw));
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    await SecureStore.setItemAsync(TAX_KEY, JSON.stringify(rates));
  };

  if (loading) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#EC3137', marginBottom: 12 }}>Taxes / Fees</Text>

        <Text>USD (%)</Text>
        <TextInput keyboardType="numeric" value={String(rates.USD)} onChangeText={(t) => setRates({ ...rates, USD: Number(t) || 0 })} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />

        <Text>VES (%)</Text>
        <TextInput keyboardType="numeric" value={String(rates.VES)} onChangeText={(t) => setRates({ ...rates, VES: Number(t) || 0 })} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />

        <Text>COP (%)</Text>
        <TextInput keyboardType="numeric" value={String(rates.COP)} onChangeText={(t) => setRates({ ...rates, COP: Number(t) || 0 })} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />

        <Button title="Save" onPress={save} />
      </View>
    </SafeAreaView>
  );
}
