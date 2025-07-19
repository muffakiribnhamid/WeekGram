import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const quotes = [
  "Plan your week, own your time.",
  "Little planning leads to big peace.",
  "Your future is built one week at a time.",
  "Success starts with structure.",
  "A planned week is a productive week.",
  "Discipline is choosing between what you want now and what you want most.",
  "Consistency creates clarity.",
  "Make time for what matters.",
  "Don’t let your days decide your destiny.",
  "Structure your week, simplify your life.",
  "Time flies. Be the pilot.",
  "A weekly plan is a silent assistant.",
];

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Navigate to Welcome screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        WeekGram
      </Animated.Text>
      <Animated.Text style={[styles.quote, { opacity: fadeAnim }]}>
        {quote}
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E94560',
    marginBottom: 20,
  },
  quote: {
    fontSize: 16,
    color: '#EEEEEE',
    textAlign: 'center',
  },
});