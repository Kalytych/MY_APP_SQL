import React, { useRef } from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { saveToStorage, setSaveToStorage } = useUser();

  const switchAnim = useRef(new Animated.Value(saveToStorage ? 1 : 0)).current;

  const toggleSwitch = (value) => {
    setSaveToStorage(value);
    Animated.timing(switchAnim, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColor = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#4cd137'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Користувач: {user.username}</Text>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Зберігати локально:</Text>
        <Animated.View style={[styles.animatedBackground, { backgroundColor }]}>
          <Switch value={saveToStorage} onValueChange={toggleSwitch} />
        </Animated.View>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={logout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  username: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  animatedBackground: {
    borderRadius: 20,
    padding: 4,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
