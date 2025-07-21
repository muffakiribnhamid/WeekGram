// fragments/SettingsFragment.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsFragment = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [about, setAbout] = useState('');
  const [bugReport, setBugReport] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const name = await AsyncStorage.getItem('user_name');
      const avatar = await AsyncStorage.getItem('user_avatar');
      const about = await AsyncStorage.getItem('user_about');
      if (name) setName(name);
      if (avatar) setAvatar(avatar);
      if (about) setAbout(about);
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('user_name', name);
      await AsyncStorage.setItem('user_avatar', avatar || '');
      await AsyncStorage.setItem('user_about', about);
      Alert.alert('Saved', 'Your profile settings have been updated.');
    } catch (err) {
      Alert.alert('Error', 'Failed to save settings.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const reportBug = () => {
    if (!bugReport.trim()) {
      Alert.alert('Error', 'Bug description cannot be empty');
      return;
    }

    // Here you can integrate with your backend, for now just show alert
    Alert.alert('Thank you!', 'Your bug report has been submitted.');
    setBugReport('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>Pick Avatar</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>About You</Text>
          <TextInput
            value={about}
            onChangeText={setAbout}
            placeholder="Write a short bio"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Report a Bug</Text>
        <TextInput
          value={bugReport}
          onChangeText={setBugReport}
          placeholder="Describe the issue you faced..."
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.reportButton} onPress={reportBug}>
          <Text style={styles.reportButtonText}>Submit Bug Report</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Quick Links</Text>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/muffakir')}>
            <Text style={styles.linkText}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/in/muffakir')}>
            <Text style={styles.linkText}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://x.com/muffakir')}>
            <Text style={styles.linkText}>X (Twitter)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://dev.to/muffakir')}>
            <Text style={styles.linkText}>Dev.to</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingsFragment;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495E',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  avatarWrapper: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DCDDE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#636E72',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#34495E',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#10AC84',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  reportButton: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  linkText: {
    fontSize: 16,
    color: '#0984E3',
    margin: 10,
    textDecorationLine: 'underline',
  },
});
