import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { sendTelegramMessage } from '../services/telegramService';
import { getUser } from '../services/storageService';

const STORAGE_KEY = '@weekgram_tasks';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HomeFragment = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [estTime, setEstTime] = useState('');
  const [reminders, setReminders] = useState([]);
  const [everyDay, setEveryDay] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  };

  const saveTasks = async (newTasks) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const toggleReminderDay = (day) => {
    if (reminders.includes(day)) {
      setReminders(reminders.filter((d) => d !== day));
    } else {
      setReminders([...reminders, day]);
    }
  };

  const addTask = () => {
    if (!title.trim() || !desc.trim() || !estTime.trim()) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description: desc,
      estTime,
      remindDays: everyDay ? [...daysOfWeek] : reminders,
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    setModalVisible(false);
    resetForm();
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setEstTime('');
    setReminders([]);
    setEveryDay(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDesc}>{item.description}</Text>
        <Text style={styles.taskMeta}>⏱ {item.estTime} mins | 🔔 {item.remindDays.join(', ')}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#EA2027" />
      </TouchableOpacity>
    </View>
  );

  // Button handler to send today's tasks to Telegram
  const sendTodayTasksToTelegram = async () => {
    try {
      const user = await getUser();
      if (!user || !user.telegramId) return Alert.alert('No Telegram ID found');
      const telegramId = user.telegramId;

      // Get today's day string (e.g. 'Mon')
      const today = daysOfWeek[new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1];
      // Filter tasks for today
      const todaysTasks = tasks.filter(task => task.remindDays.includes(today));
      const message = todaysTasks.length
        ? `*Your Tasks for ${today}:*\n` + todaysTasks.map((t, i) => `${i + 1}. ${t.title} (${t.description})`).join('\n')
        : `No tasks scheduled for *${today}*`;
      await sendTelegramMessage(telegramId, message);
      Alert.alert('Tasks sent to Telegram!');
    } catch (error) {
      Alert.alert('Error sending to Telegram');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Weekly Tasks</Text>

      <TouchableOpacity style={styles.addButtonBar} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={26} color="#10AC84" />
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Send to Telegram Button */}
      <TouchableOpacity style={[styles.saveBtn, {marginBottom: 10}]} onPress={sendTodayTasksToTelegram}>
        <Text style={styles.saveBtnText}>📤 Send Today's Tasks to Telegram</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks added yet.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={desc}
              onChangeText={setDesc}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Estimated time (in minutes)"
              keyboardType="numeric"
              value={estTime}
              onChangeText={setEstTime}
            />

            <Text style={styles.label}>Remind on:</Text>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayChip,
                    reminders.includes(day) || everyDay ? styles.daySelected : null,
                  ]}
                  onPress={() => toggleReminderDay(day)}
                  disabled={everyDay}
                >
                  <Text
                    style={[
                      styles.dayText,
                      reminders.includes(day) || everyDay ? { color: '#fff' } : null,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => setEveryDay(!everyDay)}>
              <Text style={styles.everydayToggle}>
                {everyDay ? '✅ Remind Every Day' : '☐ Remind Every Day'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={addTask}>
              <Text style={styles.saveBtnText}>Save Task</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default HomeFragment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // below notch
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
    color: '#2C3E50',
  },
  addButtonBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#10AC84',
  },
  taskItem: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  taskDesc: {
    fontSize: 14,
    color: '#636e72',
  },
  taskMeta: {
    fontSize: 12,
    color: '#b2bec3',
  },
  empty: {
    textAlign: 'center',
    color: '#95a5a6',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
  },
  modalContent: {
    margin: 24,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dayChip: {
    borderWidth: 1,
    borderColor: '#10AC84',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  daySelected: {
    backgroundColor: '#10AC84',
  },
  dayText: {
    fontSize: 14,
    color: '#10AC84',
  },
  everydayToggle: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '500',
    color: '#2d98da',
  },
  saveBtn: {
    backgroundColor: '#10AC84',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelBtn: {
    textAlign: 'center',
    color: '#e74c3c',
    marginTop: 10,
    fontWeight: '500',
  },
});
