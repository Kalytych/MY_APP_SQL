import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Menu } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNModal from 'react-native-modal';

export default function App() {
  const [screen, setScreen] = useState('queries');
  const [theme, setTheme] = useState('light');
  const [queries, setQueries] = useState([
    { id: '1', query: 'SELECT * FROM users;', details: 'Отримує всі записи з таблиці users' },
    { id: '2', query: 'INSERT INTO users (name, age) VALUES ("John", 25);', details: 'Додає користувача John' },
  ]);

  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddQuery = (values, { resetForm }) => {
    const newQuery = {
      id: Date.now().toString(),
      query: values.query,
      details: values.details,
    };
    setQueries([...queries, newQuery]);
    resetForm();
    setScreen('queries');
  };

  const handleDelete = (id) => {
    Alert.alert('Підтвердження', 'Видалити цей запит?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Так', onPress: () =>
          setQueries((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const renderQueryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.queryItem}
      onPress={() => {
        setSelectedQuery(item);
        setVisibleDetails(true);
      }}
      onLongPress={() => handleDelete(item.id)}
    >
      <Text style={styles.queryText}>{item.query}</Text>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <SafeAreaView style={[styles.container, theme === 'dark' && styles.dark]}>

        {/* МЕНЮ НАВІГАЦІЇ */}
        <View style={styles.navbar}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="contained"
                onPress={() => setMenuVisible(true)}
              >
                Меню
              </Button>
            }
          >
            <Menu.Item onPress={() => setScreen('queries')} title="Запити" />
            <Menu.Item onPress={() => setScreen('add')} title="Додати запит" />
            <Menu.Item onPress={() => setScreen('settings')} title="Налаштування" />
          </Menu>
        </View>

        {/* ЕКРАН 1: Список запитів */}
        {screen === 'queries' && (
          <FlatList
            data={queries}
            keyExtractor={(item) => item.id}
            renderItem={renderQueryItem}
          />
        )}

        {/* ЕКРАН 2: Додати новий запит */}
        {screen === 'add' && (
          <Formik
            initialValues={{ query: '', details: '' }}
            validationSchema={Yup.object({
              query: Yup.string().required('Запит обов’язковий'),
              details: Yup.string().required('Опис обов’язковий'),
            })}
            onSubmit={handleAddQuery}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="SQL-запит"
                  value={values.query}
                  onChangeText={handleChange('query')}
                  onBlur={handleBlur('query')}
                  style={styles.input}
                  error={touched.query && errors.query}
                />
                {touched.query && errors.query && <Text style={styles.error}>{errors.query}</Text>}
                <TextInput
                  label="Деталі"
                  value={values.details}
                  onChangeText={handleChange('details')}
                  onBlur={handleBlur('details')}
                  style={styles.input}
                  multiline
                  error={touched.details && errors.details}
                />
                {touched.details && errors.details && <Text style={styles.error}>{errors.details}</Text>}
                <Button onPress={handleSubmit} mode="contained" style={styles.button}>Додати</Button>
              </View>
            )}
          </Formik>
        )}

        {/* ЕКРАН 3: Налаштування */}
        {screen === 'settings' && (
          <View style={{ padding: 20 }}>
            <Text style={styles.settingsText}>Тема інтерфейсу:</Text>
            <Button
              mode="outlined"
              onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ marginTop: 10 }}
            >
              {theme === 'light' ? 'Увімкнути темну' : 'Увімкнути світлу'}
            </Button>
          </View>
        )}

        {/* МОДАЛЬНЕ ВІКНО ДЕТАЛЕЙ */}
        <RNModal isVisible={visibleDetails} onBackdropPress={() => setVisibleDetails(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Деталі запиту</Text>
            <Text style={styles.modalText}>{selectedQuery?.query}</Text>
            <Text style={styles.modalText}>{selectedQuery?.details}</Text>
            <Button onPress={() => setVisibleDetails(false)} mode="contained" style={{ marginTop: 20 }}>
              Закрити
            </Button>
          </View>
        </RNModal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  dark: { backgroundColor: '#121212' },

  navbar: { marginBottom: 20, alignItems: 'flex-start' },
  queryItem: { padding: 15, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 5 },
  queryText: { fontSize: 16 },
  input: { marginBottom: 10, backgroundColor: '#fff' },
  button: { marginTop: 10 },

  settingsText: { fontSize: 18, marginBottom: 10 },
  error: { color: 'red', marginBottom: 5 },

  modal: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 5 },
});
