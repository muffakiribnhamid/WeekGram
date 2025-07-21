import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { TELEGRAM_BOT_TOKEN } from '@env';


const SetupScreen = () => {
  const [telegramId, setTelegramId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [buttonText, setButtonText] = useState('Save & Continue');

  const navigation = useNavigation();

  // Check if user is already saved
  useEffect(() => {
    const checkIfExists = async () => {
      const user = await AsyncStorage.getItem('weekgram_user');
      if (user) {
        navigation.replace('Success');
      }
    };
    checkIfExists();
  }, []);

  const pickAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveUserData = async () => {
    if (!telegramId.trim() || !name.trim() || !email.trim()) {
      alert('Please fill all fields.');
      return;
    }

    if (!hasSentMessage && !isWaiting) {
      setIsWaiting(true);
      const message = `👋 Hello ${name}, your setup is almost done!`;
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${telegramId}&text=${encodeURIComponent(message)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.ok) {
          throw new Error(data.description);
        }

        setButtonText('You got a message');
        setTimeout(() => {
          setHasSentMessage(true);
          setIsWaiting(false);
          setButtonText('Click Again to Continue');
        }, 3000);
      } catch (err) {
        console.error('Telegram Error:', err);
        alert('Failed to send message via Telegram.\n' + err.message);
        setIsWaiting(false);
      }
    } else if (hasSentMessage) {
      const userData = { telegramId, name, email, avatar };
      try {
        await AsyncStorage.setItem('weekgram_user', JSON.stringify(userData));
        navigation.navigate('Success');
      } catch (err) {
        console.error('Error saving user data:', err);
        alert('Something went wrong while saving.');
      }
    }
  };

  const getTelegram = () => {
    const botUrl = 'https://t.me/weekgram_bot';
    Linking.openURL(botUrl).catch(() =>
      Alert.alert('Error', 'Failed to open Telegram.')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your Profile</Text>

      <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Pick Avatar</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Telegram Chat ID (numbers only)"
        value={telegramId}
        onChangeText={text => {
          if (/^\d*$/.test(text)) setTelegramId(text);
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.getButton} onPress={getTelegram}>
        <Text style={styles.saveButtonText}>Get Your Telegram ID</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, isWaiting && { opacity: 0.7 }]}
        onPress={saveUserData}
        disabled={isWaiting}
      >
        <Text style={styles.saveButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DCDDE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#1ABC9C',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  getButton: {
    backgroundColor: '#2980B9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
