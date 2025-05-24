import React from 'react';
import { View, Text, Button, Platform, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function PostDetailScreen({ route }) {
  const { post } = route.params;

  const addReminder = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Доступ заборонено', 'Додаток не має доступу до календаря.');
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(c => c.allowsModifications);
    if (!defaultCalendar) {
      Alert.alert('Помилка', 'Не знайдено календар для запису.');
      return;
    }

    try {
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: post.title,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000), // +1 година
        notes: post.body,
        timeZone: 'UTC',
      });
      Alert.alert('Успіх', 'Нагадування додано до календаря!');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити нагадування.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{post.title}</Text>
      <Text style={{ marginVertical: 20 }}>{post.body}</Text>
      <Button title="Додати в календар" onPress={addReminder} />
    </View>
  );
}
