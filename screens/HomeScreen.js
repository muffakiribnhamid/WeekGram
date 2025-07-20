import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFragment from '../fragments/HomeFragment';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderHome = () => (
    <View style={styles.fragment}>
      <Text style={styles.heading}>Welcome to WeekGram</Text>
      <Text style={styles.subtext}>
        Plan your week, get daily Telegram reminders, and simplify your life.
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Schedule Summary</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>• Monday: Morning workout</Text>
          <Text style={styles.cardText}>• Wednesday: Client call at 11 AM</Text>
          <Text style={styles.cardText}>• Friday: Weekly Review</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminders Sent</Text>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>17</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
      </View>
    </View>
  );

  const renderAbout = () => (
    <View style={styles.fragment}>
      <Text style={styles.heading}>About WeekGram</Text>
      <Text style={styles.subtext}>
        WeekGram is your simple weekly planning assistant that connects directly with Telegram. It ensures you're reminded
        of what matters — right when you need it.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Built For</Text>
        <Text style={styles.bullet}>• Busy professionals</Text>
        <Text style={styles.bullet}>• Students & parents</Text>
        <Text style={styles.bullet}>• Anyone needing structure</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Features</Text>
        <Text style={styles.bullet}>• Set weekly tasks</Text>
        <Text style={styles.bullet}>• Choose Telegram notification time</Text>
        <Text style={styles.bullet}>• Get daily messages — never miss a beat</Text>
      </View>

    </View>
  );

  const renderSettings = () => (
    <View style={styles.fragment}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subtext}>Customize your experience (coming soon):</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.settingItem}>• Edit Schedule</Text>
        <Text style={styles.settingItem}>• Change Telegram ID</Text>
        <Text style={styles.settingItem}>• Notification Time</Text>
        <Text style={styles.settingItem}>• Dark Mode Toggle</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Info</Text>
        <Text style={styles.settingItem}>• Version: 1.0.0</Text>
        <Text style={styles.settingItem}>• Last Sync: Just now</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'home' && HomeFragment()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'settings' && renderSettings()}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons
            name="home-outline"
            size={28}
            color={activeTab === 'home' ? '#10AC84' : '#888'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('about')}
        >
          <Ionicons
            name="information-circle-outline"
            size={28}
            color={activeTab === 'about' ? '#10AC84' : '#888'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'about' && styles.tabLabelActive,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons
            name="settings-outline"
            size={28}
            color={activeTab === 'settings' ? '#10AC84' : '#888'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'settings' && styles.tabLabelActive,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFFD',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  fragment: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
  },
  subtext: {
    fontSize: 16,
    color: '#576574',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  section: {
    marginBottom: 30,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10AC84',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 8,
  },
  statBox: {
    backgroundColor: '#E8F9F3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10AC84',
  },
  statLabel: {
    fontSize: 14,
    color: '#34495E',
  },
  bullet: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 6,
    marginLeft: 10,
  },
  settingItem: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 6,
    marginLeft: 10,
  },
  credits: {
    fontSize: 14,
    color: '#A4B0BE',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#10AC84',
    fontWeight: 'bold',
  },
});
