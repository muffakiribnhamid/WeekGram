import React, { useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkVisited = async () => {
      const hasVisited = await AsyncStorage.getItem('hasVisited');
      if (hasVisited === 'true') {
        navigation.replace('Home'); 
      }
    };
    checkVisited();
  }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasVisited', 'true');
    navigation.navigate('Setup');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: '100%', height: 200, marginBottom: 20 }}
      />
      <Text style={styles.title}>Welcome to WeekGram! </Text>
      <Text style={styles.subtitle}>
        Plan your week and get daily reminders on Telegram.
      </Text>
      <Text style={styles.subtitle}>
        Made With ❤️ by Muffakir Ibn Hamid
      </Text>
      <Text style={styles.subtitle}>
        Sponsored by <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>HackClub</Text> and{' '}
        <Text style={{ color: '#0088cc', fontWeight: 'bold' }}>Gemini</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#1DA1F2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
