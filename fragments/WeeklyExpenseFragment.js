import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendTelegramMessage } from '../services/telegramService';
import { getUser } from '../services/storageService';

const WeeklyExpenseFragment = () => {
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await AsyncStorage.getItem('weekly_expenses');
    if (data) setExpenses(JSON.parse(data));
  };

  const saveExpenses = async (newExpenses) => {
    await AsyncStorage.setItem('weekly_expenses', JSON.stringify(newExpenses));
  };

  const addExpense = () => {
    if (!title.trim() || !price.trim() || !mode.trim()) {
      Alert.alert('Fill all fields');
      return;
    }
    const newExpense = {
      id: Date.now().toString(),
      title,
      price: parseFloat(price),
      date: date.toISOString().split('T')[0],
      mode,
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setMode('');
    setDate(new Date());
  };

  const sendWeeklyExpenseToTelegram = async () => {
    try {
      const user = await getUser();
      if (!user || !user.telegramId) return Alert.alert('No Telegram ID found');
      const telegramId = user.telegramId;

      const currentWeekExpenses = expenses.filter((e) => {
        const now = new Date();
        const expenseDate = new Date(e.date);
        const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });

      const total = currentWeekExpenses.reduce((sum, e) => sum + e.price, 0);
      const message = `📟 *Weekly Expense Summary*\n\n${currentWeekExpenses
        .map(
          (e, i) =>
            `${i + 1}. ${e.title} - ₹${e.price} on ${e.date} (${e.mode})`
        )
        .join('\n')}\n\n*Total:* ₹${total}`;

      await sendTelegramMessage(telegramId, message);
      Alert.alert('Summary sent to Telegram!');
    } catch (error) {
      Alert.alert('Error sending to Telegram');
    }
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Weekly Expense Tracker</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemText}>₹{item.price}</Text>
              <Text style={styles.itemSub}>
                {item.date} | {item.mode}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No expenses added</Text>}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>+ Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#27ae60' }]}
          onPress={sendWeeklyExpenseToTelegram}
        >
          <Text style={styles.buttonText}>📤 Send Weekly Summary</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>New Expense</Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                style={styles.input}
                placeholder="Mode of Payment"
                value={mode}
                onChangeText={setMode}
              />
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    if (d) setDate(d);
                    setShowDatePicker(false);
                  }}
                />
              )}

              <TouchableOpacity style={styles.saveButton} onPress={addExpense}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#c0392b' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default WeeklyExpenseFragment;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FDFEFF',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0080ffff',
  },
  expenseItem: {
    backgroundColor: '#0080ffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSub: {
    fontSize: 12,
    color: '#7B8D93',
  },
  empty: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginTop: 50,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2980B9',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D3D4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#D0D3D4',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  saveButton: {
    backgroundColor: '#1ABC9C',
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
  },
});
