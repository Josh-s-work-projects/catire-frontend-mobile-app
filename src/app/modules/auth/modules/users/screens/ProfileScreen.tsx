import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../../../../shared/store/auth.store';
import { useUserStore } from '../../../store/user.store';
import { styles } from '../styles/profile.styles';

export const ProfileScreen = () => {
  const { user } = useAuthStore();
  const { updateProfile, loading } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone_1: user?.phone_1 || '',
    dni: String(user?.dni || ''),
  });

  const handleSave = async () => {
    const changes: any = {};
    
    if (formData.full_name !== user?.full_name) changes.full_name = formData.full_name;
    if (formData.email !== user?.email) changes.email = formData.email;
    if (formData.phone_1 !== user?.phone_1) changes.phone_1 = formData.phone_1;
    if (Number(formData.dni) !== user?.dni) changes.dni = Number(formData.dni);

    if (Object.keys(changes).length === 0) {
      setIsEditing(false);
      return;
    }

    await updateProfile(changes);
    
    setIsEditing(false);
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editIcon}>✏️ Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.form}>
        {['full_name', 'email', 'phone_1', 'dni'].map((field) => (
          <View key={field} style={styles.fieldGroup}>
            <Text style={styles.label}>{field.replace('_', ' ').toUpperCase()}</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData[field as keyof typeof formData]}
              onChangeText={(val) => setFormData({ ...formData, [field]: val })}
              editable={isEditing}
              keyboardType={field === 'dni' ? 'numeric' : 'default'}
            />
          </View>
        ))}

        {isEditing && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Guardar</Text>}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};