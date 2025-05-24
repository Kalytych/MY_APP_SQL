import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export default function UsersScreen({ navigation }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://reqres.in/api/users?page=1', {
        headers: {
          'Accept': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    },
  });

  if (isLoading) return <Text>Завантаження...</Text>;
  if (error) return <Text>Помилка: {error.message}</Text>;

  return (
    <FlatList
      data={data?.data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
          <View style={{ padding: 10 }}>
            <Text>{item.first_name} {item.last_name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
