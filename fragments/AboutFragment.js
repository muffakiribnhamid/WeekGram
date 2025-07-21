import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const AboutFragment = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Ionicons name="logo-github" size={24} color="#fff" />,
      url: 'https://github.com/muffakirhamid',
    },
    {
      name: 'LinkedIn',
      icon: <Ionicons name="logo-linkedin" size={24} color="#fff" />,
      url: 'https://linkedin.com/in/muffakirhamid',
    },
    {
      name: 'X',
      icon: <FontAwesome name="twitter" size={24} color="#fff" />,
      url: 'https://x.com/muffakirhamid',
    },
    {
      name: 'Dev.to',
      icon: <Ionicons name="logo-codepen" size={24} color="#fff" />,
      url: 'https://dev.to/muffakirhamid',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#56CCF2', '#2F80ED']}
        style={styles.gradientBackground}
      >
        <Image
          source={{
            uri: 'https://avatars.githubusercontent.com/u/11111111?v=4', // replace with actual
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Muffakir Ibn Hamid</Text>
        <Text style={styles.bio}>
          I’m a creative mobile and web developer passionate about building
          meaningful digital experiences. WeekGram is my latest creation to help
          people stay organized through Telegram reminders!
        </Text>
      </LinearGradient>

      <View style={styles.linkSection}>
        <Text style={styles.sectionTitle}>Connect with me</Text>
        {socialLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkBox}
            onPress={() => Linking.openURL(link.url)}
          >
            <LinearGradient
              colors={['#00C9FF', '#92FE9D']}
              style={styles.linkGradient}
            >
              {link.icon}
              <Text style={styles.linkText}>{link.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} Muffakir Hamid</Text>
        <Text style={styles.footerSub}>All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

export default AboutFragment;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F2FAFF',
  },
  gradientBackground: {
    width: '90%',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  linkSection: {
    width: '90%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#34495E',
  },
  linkBox: {
    width: '100%',
    marginBottom: 14,
    borderRadius: 12,
    overflow: 'hidden',
  },
  linkGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8395A7',
  },
  footerSub: {
    fontSize: 12,
    color: '#A4B0BE',
  },
});
