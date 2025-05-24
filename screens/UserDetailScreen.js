import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as ImagePicker from 'expo-image-picker';

export default function UserDetailScreen({ route }) {
  const { user } = route.params;
  const [image, setImage] = useState(null);

  const addReminderToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find(cal => cal.allowsModifications);
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: `Переглянути ${user.first_name}`,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000),
        timeZone: 'Europe/Kyiv',
      });
      alert('Нагадування додано!');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{user.first_name} {user.last_name}</Text>
      <Text>{user.email}</Text>

      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}

      <Button title="Додати нагадування в календар" onPress={addReminderToCalendar} />
      <Button title="Прикріпити зображення" onPress={pickImage} />
    </View>
  );
}
