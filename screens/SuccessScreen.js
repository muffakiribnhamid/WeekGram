import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
      startAnimations();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const startAnimations = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1ABC9C" />
        <Text style={styles.loadingText}>Setting things up...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Connection Successful
      </Animated.Text>

      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Your WeekGram bot is now linked with your Telegram account.
      </Animated.Text>

     

      {/* Progress Bar */}
      <Text style={styles.sectionTitle}>Progress</Text>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      {/* Info Box */}
      <Text style={styles.sectionTitle}>What Happens Next</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          • You’ll receive reminders daily according to your weekly plan.
        </Text>
        <Text style={styles.infoText}>
          • Your Telegram bot will message you every morning at your selected time.
        </Text>
        <Text style={styles.infoText}>
          • You can change your schedule anytime in the settings.
        </Text>
      </View>

      {/* Motivation Section */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          “Discipline is choosing between what you want now and what you want most.”
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tips Section */}
      <Text style={styles.sectionTitle}>Tips to Maximize Productivity</Text>
      <View style={styles.tipsBox}>
        <Text style={styles.tip}> Keep your reminders short but actionable.</Text>
        <Text style={styles.tip}> Review your plan weekly to adjust for changes.</Text>
        <Text style={styles.tip}> Use themes for days (e.g., Marketing Monday).</Text>
        <Text style={styles.tip}> Mute unnecessary chats during work hours.</Text>
      </View>

      {/* Footer Section */}
      <Text style={styles.sectionTitle}>Follow Us</Text>
      <View style={styles.footerLinks}>
        <Text style={styles.link}>weekgram.app</Text>
        <Text style={styles.link}>support@weekgram.app</Text>
        <Text style={styles.link}>t.me/weekgram_bot</Text>
      </View>

      {/* Bottom CTA */}
      <TouchableOpacity style={styles.feedbackButton}>
        <Text style={styles.feedbackText}>Leave Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  backgroundColor: '#F5FFFD',
  padding: 24,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40,
  marginBottom: 60, // <- Added for spacing at the bottom
},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FFFD',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#34495E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1ABC9C',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 30,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
  },
  quoteContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 15,
    color: '#576574',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10AC84',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 4,
    marginVertical: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#D1D8E0',
    marginVertical: 20,
  },
  tipsBox: {
    backgroundColor: '#EAF9F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
  },
  tip: {
    fontSize: 15,
    color: '#2C3E50',
    marginBottom: 8,
  },
  footerLinks: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#1A73E8',
    marginBottom: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#d0f0e0',
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10AC84',
    borderRadius: 6,
  },
  feedbackButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#1ABC9C',
    marginTop: 30,
    marginBottom: 40,
  },
  feedbackText: {
    color: '#1ABC9C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
