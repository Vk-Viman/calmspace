import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MeditateRoute() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const [volume, setVolume] = useState(0.7);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const progressAnim = useRef(new Animated.Value(0)).current;

  const categories = ['All', 'Sleep', 'Focus', 'Stress', 'Anxiety', 'Mindfulness'];
  
  const sessions = [
    { id: 1, title: 'Morning Calm', duration: '10 min', category: 'Mindfulness', description: 'Start your day with peace and clarity', icon: '🌅' },
    { id: 2, title: 'Deep Sleep', duration: '15 min', category: 'Sleep', description: 'Gentle guidance into restful sleep', icon: '😴' },
    { id: 3, title: 'Focus Flow', duration: '12 min', category: 'Focus', description: 'Enhance concentration and mental clarity', icon: '🎯' },
    { id: 4, title: 'Stress Relief', duration: '8 min', category: 'Stress', description: 'Release tension and find inner peace', icon: '🧘‍♀️' },
    { id: 5, title: 'Anxiety Soothing', duration: '10 min', category: 'Anxiety', description: 'Calm your mind and ease worries', icon: '😌' },
    { id: 6, title: 'Body Scan', duration: '20 min', category: 'Mindfulness', description: 'Full body relaxation and awareness', icon: '👁️' },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentTime / duration,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentTime, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  const handleSessionPress = (session: any) => {
    // In a real app, this would start the specific session
    setDuration(session.duration === '10 min' ? 600 : session.duration === '15 min' ? 900 : session.duration === '12 min' ? 720 : session.duration === '8 min' ? 480 : 1200);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const filteredSessions = selectedCategory === 'All' 
    ? sessions 
    : sessions.filter(session => session.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Meditation</Text>
            <Text style={styles.subtitle}>Find your inner peace</Text>
          </View>

          {/* Current Session Player */}
          <View style={styles.playerCard}>
            <Text style={styles.playerTitle}>Current Session</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View 
                  style={[
                    styles.progressFill, 
                    { width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    })}
                  ]} 
                />
              </View>
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>
            
            <View style={styles.controls}>
              <TouchableOpacity style={styles.controlButton} onPress={resetSession} activeOpacity={0.8}>
                <Text style={styles.controlIcon}>⏹️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton} onPress={togglePlayPause} activeOpacity={0.8}>
                <Text style={styles.playIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => {}} activeOpacity={0.8}>
                <Text style={styles.controlIcon}>⏭️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.volumeContainer}>
              <Text style={styles.volumeLabel}>Volume</Text>
              <View style={styles.volumeSlider}>
                <View style={styles.volumeTrack}>
                  <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
                  <TouchableOpacity 
                    style={[styles.volumeThumb, { left: `${volume * 100 - 2}%` }]}
                    onPress={() => handleVolumeChange(volume === 1 ? 0 : volume + 0.1)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategoryButton
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sessions List */}
          <View style={styles.sessionsSection}>
            <Text style={styles.sectionTitle}>Available Sessions</Text>
            {filteredSessions.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={styles.sessionCard}
                onPress={() => handleSessionPress(session)}
                activeOpacity={0.8}
              >
                <View style={styles.sessionIcon}>
                  <Text style={styles.sessionEmoji}>{session.icon}</Text>
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>{session.title}</Text>
                  <Text style={styles.sessionDescription}>{session.description}</Text>
                  <View style={styles.sessionMeta}>
                    <Text style={styles.sessionDuration}>{session.duration}</Text>
                    <Text style={styles.sessionCategory}>{session.category}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playSessionButton} activeOpacity={0.8}>
                  <Text style={styles.playSessionIcon}>▶️</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Personalized Plan Button */}
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
  subtitle: { fontSize: 16, color: '#6B7280' },
  playerCard: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 24, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  playerTitle: { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 20, textAlign: 'center' },
  progressContainer: { marginBottom: 20 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 4 },
  timeDisplay: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 20 },
  controlButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  controlIcon: { fontSize: 20 },
  playButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center' },
  playIcon: { fontSize: 30 },
  volumeContainer: { alignItems: 'center' },
  volumeLabel: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  volumeSlider: { width: '100%' },
  volumeTrack: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, position: 'relative' },
  volumeFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  volumeThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#10B981', position: 'absolute', top: '50%', transform: [{ translateY: -10 }] },
  categoriesSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 16 },
  categoriesScroll: { marginBottom: 16 },
  categoryButton: { backgroundColor: '#F3F4F6', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, marginRight: 12 },
  selectedCategoryButton: { backgroundColor: '#8B5CF6' },
  categoryText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  selectedCategoryText: { color: '#fff' },
  sessionsSection: { marginBottom: 24 },
  sessionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
  sessionIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sessionEmoji: { fontSize: 24 },
  sessionInfo: { flex: 1 },
  sessionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  sessionDescription: { fontSize: 14, color: '#6B7280', marginBottom: 8, lineHeight: 20 },
  sessionMeta: { flexDirection: 'row', gap: 16 },
  sessionDuration: { fontSize: 12, color: '#8B5CF6', backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  sessionCategory: { fontSize: 12, color: '#6B7280' },
  playSessionButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center' },
  playSessionIcon: { fontSize: 16 },
  planButton: { backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  planButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});


