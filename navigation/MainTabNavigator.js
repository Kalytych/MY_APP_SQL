import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QueryManagerScreen from '../screens/QueryManagerScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Головна') {
            iconName = 'home-outline';
          } else if (route.name === 'Налаштування') {
            iconName = 'settings-outline';
          } else if (route.name === 'SQL Запити') {
            iconName = 'code-slash-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="SQL Запити" component={QueryManagerScreen} />
      <Tab.Screen name="Налаштування" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
