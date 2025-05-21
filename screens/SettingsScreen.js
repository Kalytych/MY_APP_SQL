import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Користувач: {user.username}</Text>
      <Button title="Вийти" onPress={logout} />
    </View>
  );
}
