// screens/PostsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export default function PostsScreen({ navigation }) {
  const { data, isLoading, error } = useQuery(['posts'], async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading posts</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text numberOfLines={2}>{item.body}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
