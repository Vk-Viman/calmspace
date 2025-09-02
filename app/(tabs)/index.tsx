import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  age: number;
  avatar: string;
}

export default function HomeRoute() {
  const [selectedGoal, setSelectedGoal] = useState('Focus');
  const [stressLevel, setStressLevel] = useState(7);
  const [userName, setUserName] = useState('Kavinda');
  const [greeting, setGreeting] = useState('Good Morning');
  const breathingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadUserProfile();
    setGreetingBasedOnTime();
    startBreathingAnimation();
  }, []);

  // Refresh profile data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const loadUserProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile: UserProfile = JSON.parse(savedProfile);
        setUserName(profile.fullName);
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const setGreetingBasedOnTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  };

  const startBreathingAnimation = () => {
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, { toValue: 1.1, duration: 3000, useNativeDriver: true }),
        Animated.timing(breathingAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ])
    );
    breathing.start();
    return () => breathing.stop();
  };

  const handleQuickAccess = (type: string) => {
    switch (type) {
      case 'meditation':
        router.push('/(tabs)/meditate');
        break;
      case 'mood':
        router.push('/(tabs)/mood');
        break;
      case 'plan':
        router.push('/personalized-plan');
        break;
      case 'community':
        router.push('/(tabs)/community');
        break;
    }
  };

  const handleStartMeditation = () => {
    router.push('/(tabs)/meditate');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <Animated.View style={[styles.breathingBackground, { transform: [{ scale: breathingAnim }] }]} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.greeting}>{greeting}, {userName} 🌅</Text>
            <Text style={styles.subtitle}>Let's start your day with peace</Text>
          </View>

          <View style={styles.quickAccessSection}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.8} onPress={() => handleQuickAccess('meditation')}>
                <Text style={styles.quickAccessIcon}>🧘‍♀️</Text>
                <Text style={styles.quickAccessTitle}>Guided Sessions</Text>
                <Text style={styles.quickAccessSubtitle}>Start meditating</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.8} onPress={() => handleQuickAccess('mood')}>
                <Text style={styles.quickAccessIcon}>😌</Text>
                <Text style={styles.quickAccessTitle}>Mood Tracker</Text>
                <Text style={styles.quickAccessSubtitle}>Log your mood</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.8} onPress={() => handleQuickAccess('plan')}>
                <Text style={styles.quickAccessIcon}>📋</Text>
                <Text style={styles.quickAccessTitle}>My Plan</Text>
                <Text style={styles.quickAccessSubtitle}>View routine</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessCard} activeOpacity={0.8} onPress={() => handleQuickAccess('community')}>
                <Text style={styles.quickAccessIcon}>👥</Text>
                <Text style={styles.quickAccessTitle}>Community</Text>
                <Text style={styles.quickAccessSubtitle}>Connect & share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personalized Meditation Plan</Text>
            <View style={styles.goalContainer}>
              <Text style={styles.question}>What is your goal today?</Text>
              <View style={styles.goalButtons}>
                {goals.map((goal) => (
                  <TouchableOpacity key={goal.id} style={[styles.goalButton, selectedGoal === goal.id && styles.selectedGoalButton]} onPress={() => setSelectedGoal(goal.id)} activeOpacity={0.8}>
                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                    <Text style={[styles.goalLabel, selectedGoal === goal.id && styles.selectedGoalLabel]}>
                      {goal.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.stressContainer}>
              <Text style={styles.stressLabel}>Current Stress Level</Text>
              <View style={styles.stressBar}>
                <View style={styles.stressTrack}>
                  <View style={[styles.stressFill, { width: `${(stressLevel / 10) * 100}%` }]} />
                </View>
                <Text style={styles.stressValue}>{stressLevel}/10</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartMeditation} activeOpacity={0.8}>
              <Text style={styles.startButtonText}>Start Meditation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const goals = [
  { id: 'Relax', label: 'Relax', icon: '😌' },
  { id: 'Focus', label: 'Focus', icon: '🎯' },
  { id: 'Sleep', label: 'Sleep', icon: '😴' },
  { id: 'Anxiety', label: 'Anxiety', icon: '😰' },
  { id: 'Stress', label: 'Stress', icon: '😤' },
  { id: 'Energy', label: 'Energy', icon: '⚡' },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { marginBottom: 30 },
  greeting: { fontSize: 28, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280' },
  section: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 24, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginBottom: 20 },
  goalContainer: { marginBottom: 24 },
  question: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 16 },
  goalButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  goalButton: { backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center', minWidth: 80 },
  selectedGoalButton: { backgroundColor: '#8B5CF6' },
  goalIcon: { fontSize: 24, marginBottom: 4 },
  goalLabel: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  selectedGoalLabel: { color: '#fff' },
  stressContainer: { marginBottom: 24 },
  stressLabel: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  stressBar: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stressTrack: { flex: 1, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  stressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  stressValue: { fontSize: 14, fontWeight: '600', color: '#374151', minWidth: 40 },
  startButton: { backgroundColor: '#8B5CF6', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  breathingBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#E9D5FF', opacity: 0.1, borderRadius: 50, zIndex: -1 },
  quickAccessSection: { marginBottom: 24 },
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  quickAccessCard: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 16, alignItems: 'center', minWidth: 120, flex: 1 },
  quickAccessIcon: { fontSize: 36, marginBottom: 8 },
  quickAccessTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 4 },
  quickAccessSubtitle: { fontSize: 12, color: '#6B7280' },
});

