import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Slider from '@react-native-community/slider';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MoodRoute() {
  const [selectedMood, setSelectedMood] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😡', label: 'Angry', value: 'angry' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🤗', label: 'Grateful', value: 'grateful' },
  ];

  const handleMoodSubmit = () => {
    if (!selectedMood) {
      Alert.alert('Select Mood', 'Please select your current mood');
      return;
    }
    setLoading(true);
    addDoc(collection(db, 'moods'), {
      userId: auth.currentUser ? auth.currentUser.uid : null,
      mood: selectedMood,
      stressLevel,
      journalEntry,
      reminderEnabled,
      createdAt: Timestamp.now(),
    })
      .then(() => {
        Alert.alert(
          'Mood Recorded!',
          'Your mood has been recorded. Would you like to create a personalized meditation plan?',
          [
            { text: 'Not Now', style: 'cancel' },
            { text: 'Create Plan', onPress: () => router.push('/personalized-plan') }
          ]
        );
      })
      .catch((error) => {
        Alert.alert('Error', error.message || 'Failed to record mood.');
      })
      .finally(() => setLoading(false));
  };

  const handleStressChange = (level: number) => {
  setStressLevel(level);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>How are you feeling?</Text>
            <Text style={styles.subtitle}>Track your mood and emotions</Text>
          </View>

          <View style={styles.moodSection}>
            <Text style={styles.sectionTitle}>Current Mood</Text>
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.value && styles.selectedMoodButton
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[
                    styles.moodLabel,
                    selectedMood === mood.value && styles.selectedMoodLabel
                  ]}>
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.stressSection}>
            <Text style={styles.sectionTitle}>Stress Level</Text>
            <Text style={styles.stressDescription}>How stressed do you feel right now?</Text>
            <View style={styles.stressSlider}>
              <View style={styles.stressLabels}>
                <Text style={styles.stressLabel}>Very Calm</Text>
                <Text style={styles.stressLabel}>Overwhelmed</Text>
              </View>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={stressLevel}
                minimumTrackTintColor="#8B5CF6"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#8B5CF6"
                onValueChange={handleStressChange}
              />
              <Text style={styles.stressValue}>{stressLevel}/10</Text>
            </View>
          </View>

          <View style={styles.journalSection}>
            <Text style={styles.sectionTitle}>Journal Entry (Optional)</Text>
            <Text style={styles.journalDescription}>Write about what's on your mind</Text>
            <TextInput
              style={styles.journalInput}
              placeholder="How are you feeling today? What's on your mind?"
              placeholderTextColor="#9CA3AF"
              value={journalEntry}
              onChangeText={setJournalEntry}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.reminderSection}>
            <Text style={styles.sectionTitle}>Daily Mood Check-in</Text>
            <Text style={styles.reminderDescription}>Get reminded to track your mood daily</Text>
            <TouchableOpacity 
              style={[styles.reminderToggle, reminderEnabled && styles.reminderEnabled]}
              onPress={() => setReminderEnabled(!reminderEnabled)}
              activeOpacity={0.8}
            >
              <Text style={styles.reminderText}>
                {reminderEnabled ? 'Reminders Enabled' : 'Enable Reminders'}
              </Text>
              <View style={[styles.toggleCircle, reminderEnabled && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleMoodSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Record Mood</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.planButton} 
            onPress={() => router.push('/personalized-plan')}
            activeOpacity={0.8}
          >
            <Text style={styles.planButtonText}>Create Personalized Plan</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
  moodSection: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 16 },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  moodButton: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, alignItems: 'center', minWidth: 80, borderWidth: 2, borderColor: 'transparent' },
  selectedMoodButton: { backgroundColor: '#F3F4F6', borderColor: '#8B5CF6' },
  moodEmoji: { fontSize: 32, marginBottom: 8 },
  moodLabel: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  selectedMoodLabel: { color: '#8B5CF6', fontWeight: '600' },
  stressSection: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  stressDescription: { fontSize: 14, color: '#6B7280', marginBottom: 20 },
  stressSlider: { alignItems: 'center' },
  stressLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  stressLabel: { fontSize: 14, color: '#6B7280' },
  stressTrack: { width: '100%', height: 12, backgroundColor: '#E5E7EB', borderRadius: 6, position: 'relative', marginBottom: 16 },
  stressFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 6 },
  stressThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#8B5CF6', position: 'absolute', top: '50%', transform: [{ translateY: -12 }] },
  stressValue: { fontSize: 18, fontWeight: '600', color: '#8B5CF6' },
  journalSection: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  journalDescription: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  journalInput: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, fontSize: 16, color: '#374151', minHeight: 100, textAlignVertical: 'top' },
  reminderSection: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  reminderDescription: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  reminderToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F3F4F6', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12 },
  reminderEnabled: { backgroundColor: '#E0E7FF' },
  reminderText: { fontSize: 16, fontWeight: '500', color: '#374151' },
  toggleCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#9CA3AF' },
  toggleCircleActive: { backgroundColor: '#8B5CF6' },
  submitButton: { backgroundColor: '#8B5CF6', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  planButton: { backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  planButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});


