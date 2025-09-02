import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    { title: 'Welcome to Calm Space', description: 'Find Your Calm, Anytime. Discover tranquility through guided meditation and mindfulness practices.', image: '🧘‍♀️', buttonText: 'Next' },
    { title: 'Personalized Experience', description: 'Get AI-powered meditation recommendations tailored to your mood, stress levels, and wellness goals.', image: '✨', buttonText: 'Next' },
    { title: 'Track Your Journey', description: 'Monitor your mood, stress levels, and meditation progress with beautiful insights and reports.', image: '📊', buttonText: 'Next' },
    { title: 'Join the Community', description: 'Connect with like-minded individuals, share experiences, and participate in wellness challenges together.', image: '👥', buttonText: 'Get Started' },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    } else {
      // Navigate to login screen
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    // Allow users to skip onboarding and go directly to login
    router.replace('/login');
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return (
    <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.container}>
      <ScrollView ref={scrollViewRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16} style={styles.scrollView}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.content}>
              <Text style={styles.title}>{slide.title}</Text>
              <View style={styles.illustrationContainer}>
                <Text style={styles.illustration}>{slide.image}</Text>
              </View>
              <Text style={styles.description}>{slide.description}</Text>
              <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{slide.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, { backgroundColor: index === currentIndex ? '#8B5CF6' : '#D1D5DB' }]} />
          ))}
        </View>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.8}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  slide: { width, height, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937', textAlign: 'center', marginBottom: 40 },
  illustrationContainer: { marginBottom: 40 },
  illustration: { fontSize: 120 },
  description: { fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24, marginBottom: 60, paddingHorizontal: 20 },
  button: { backgroundColor: '#8B5CF6', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 25, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  bottomContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 40, 
    paddingBottom: 50 
  },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  skipButton: { paddingVertical: 12, paddingHorizontal: 20 },
  skipButtonText: { color: '#8B5CF6', fontSize: 16, fontWeight: '600' },
});


