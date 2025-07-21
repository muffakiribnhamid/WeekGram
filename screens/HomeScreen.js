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
import WeeklyExpenseFragment from '../fragments/WeeklyExpenseFragment';
import SettingFragment from '../fragments/SettingFragment';
import AboutFragment from '../fragments/AboutFragment';



const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeFragment />}
        {activeTab === 'expenses' && <WeeklyExpenseFragment />}
        {activeTab === 'settings' && <SettingFragment/>}
        {activeTab === 'about' && <AboutFragment/>}
      </View>

      {/* Bottom Nav */}
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
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('expenses')}
        >
          <Ionicons
            name="cash-outline"
            size={28}
            color={activeTab === 'expenses' ? '#10AC84' : '#888'}
          />
          <Text style={[styles.tabLabel, activeTab === 'expenses' && styles.tabLabelActive]}>Expenses</Text>
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
          <Text style={[styles.tabLabel, activeTab === 'about' && styles.tabLabelActive]}>About</Text>
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
          <Text style={[styles.tabLabel, activeTab === 'settings' && styles.tabLabelActive]}>Settings</Text>
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
    flex: 1,
    paddingBottom: 80,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  fragment: {
    paddingBottom: 100,
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
  settingItem: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 6,
    marginLeft: 10,
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
