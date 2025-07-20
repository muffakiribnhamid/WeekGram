import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = '@weekgram_tasks';

const HomeFragment = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks whenever updated
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (err) {
      console.error('Error saving tasks:', err);
    }
  };

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { id: Date.now().toString(), text: task };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#EA2027" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Weekly Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color="#10AC84" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks added yet.</Text>
        }
      />
    </View>
  );
};

export default HomeFragment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f2f6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#34495E',
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#95a5a6',
    fontSize: 16,
  },
});
