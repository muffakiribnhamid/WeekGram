import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SetupScreen = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [telegramId, setTelegramId] = useState('');
  const navigation = useNavigation();

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const onTimeChange = (event, selected) => {
    if (selected) {
      setSelectedTime(selected);
    }
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const saveSchedule = async () => {
    if (!telegramId.trim()) {
      alert('Please enter your Telegram ID.');
      return;
    }

    const schedule = {
      telegramId,
      selectedDays,
      hour: selectedTime.getHours(),
      minute: selectedTime.getMinutes(),
    };

    try {
      await AsyncStorage.setItem('weekgram_schedule', JSON.stringify(schedule));
      alert('Schedule saved!');
      navigation.navigate('Welcome'); // or Success screen if you have one
    } catch (err) {
      console.error('Saving schedule failed:', err);
      alert('Something went wrong while saving.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Weekly Schedule</Text>

      <Text style={styles.label}>Select Days:</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.day,
              selectedDays.includes(day) && styles.daySelected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Pick Time:</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeText}>
          {selectedTime.getHours().toString().padStart(2, '0')}:
          {selectedTime.getMinutes().toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.label}>Telegram Chat ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Telegram Chat ID"
        value={telegramId}
        onChangeText={setTelegramId}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
        <Text style={styles.saveButtonText}>Save Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAFCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#34495E',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    width: '100%',
  },
  day: {
    borderWidth: 1,
    borderColor: '#3498DB',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  daySelected: {
    backgroundColor: '#3498DB',
  },
  dayText: {
    color: '#3498DB',
    fontWeight: '500',
  },
  dayTextSelected: {
    color: '#FFF',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#95A5A6',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  timeText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#1ABC9C',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});