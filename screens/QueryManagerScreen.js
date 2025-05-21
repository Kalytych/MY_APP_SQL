import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QueryManagerScreen() {
  const [queries, setQueries] = useState([
    { id: '1', text: 'SELECT * FROM users' },
    { id: '2', text: 'SELECT * FROM orders WHERE status = "pending"' },
  ]);
  const [newQuery, setNewQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const isDarkMode = useColorScheme() === 'dark';

  const addQuery = () => {
    if (newQuery.trim()) {
      setQueries([...queries, { id: Math.random().toString(), text: newQuery }]);
      setNewQuery('');
    }
  };

  const openQuery = (query) => {
    setSelectedQuery(query);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuery(null);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: isDarkMode ? '#fff' : '#000' }}>
        SQL Запити
      </Text>
      <FlatList
        data={queries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openQuery(item)}
            style={{
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9',
              padding: 12,
              marginBottom: 8,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TextInput
          value={newQuery}
          onChangeText={setNewQuery}
          placeholder="Введіть SQL-запит"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: isDarkMode ? '#333' : '#ccc',
            padding: 10,
            color: isDarkMode ? '#fff' : '#000',
            backgroundColor: isDarkMode ? '#111' : '#fff',
            borderRadius: 6,
          }}
        />
        <TouchableOpacity onPress={addQuery} style={{ marginLeft: 8, justifyContent: 'center' }}>
          <Ionicons name="add-circle" size={32} color={isDarkMode ? '#0af' : '#007aff'} />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: isDarkMode ? '#222' : '#fff',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}>
            <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 18, marginBottom: 10 }}>
              Деталі запиту:
            </Text>
            <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{selectedQuery?.text}</Text>
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 16, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#007aff' }}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
