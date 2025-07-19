import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SetupBot = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOpenBot = () => {
    Linking.openURL('https://t.me/YourBotUsername'); // replace with your bot link
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Setup Telegram Bot
      </Animated.Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.step}> Step 1:</Text>
        <Text style={styles.desc}>
          Tap the button below to open the WeekGram Bot in Telegram.
        </Text>
        <TouchableOpacity style={styles.botButton} onPress={handleOpenBot}>
          <Text style={styles.botButtonText}>Open WeekGram Bot</Text>
        </TouchableOpacity>

        <Text style={styles.step}> Step 2:</Text>
        <Text style={styles.desc}>
          Click the “Start” button inside Telegram. This allows the bot to talk to you.
        </Text>

        <Text style={styles.step}> Step 3:</Text>
        <Text style={styles.desc}>
          Optionally, search for @userinfobot in Telegram and tap Start.
          It will reply with your Telegram ID.
        </Text>

        <Text style={styles.step}> Step 4:</Text>
        <Text style={styles.desc}>
          Copy the number shown (e.g., 123456789) and paste it in the next screen.
        </Text>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.continueText}>Continue to Setup</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default SetupBot;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
    textAlign: 'center',
  },
  step: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2980B9',
  },
  desc: {
    fontSize: 16,
    textAlign: 'left',
    color: '#34495E',
    marginBottom: 12,
  },
  botButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  botButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
