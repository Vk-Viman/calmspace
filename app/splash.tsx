import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const breathingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, { toValue: 1.2, duration: 2000, useNativeDriver: true }),
        Animated.timing(breathingAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    );
    breathing.start();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();

    // Navigate to onboarding after delay
    const timer = setTimeout(() => {
      try {
        router.replace('/onboarding');
      } catch (error) {
        console.log('Navigation error:', error);
        // Fallback navigation
        router.push('/onboarding');
      }
    }, 1800);

    return () => {
      breathing.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <LinearGradient colors={['#E9D5FF', '#DBEAFE', '#C7D2FE']} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }] }>
        <View style={styles.iconContainer}>
          <Animated.View style={[styles.breathingCircle, { transform: [{ scale: breathingAnim }] }]}>
            <View style={styles.lotusOuter}>
              <View style={styles.lotusInner}>
                <View style={styles.lotusCenter} />
              </View>
            </View>
          </Animated.View>
        </View>
        <Text style={styles.title}>Calm Space</Text>
        <Text style={styles.tagline}>Find Your Calm, Anytime</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center' },
  iconContainer: { marginBottom: 30 },
  breathingCircle: { alignItems: 'center', justifyContent: 'center' },
  lotusOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  lotusInner: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  lotusCenter: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: '700', color: '#1F2937', textShadowColor: 'rgba(255,255,255,0.8)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4, marginBottom: 8 },
  tagline: { fontSize: 16, fontWeight: '500', color: '#6B7280', textAlign: 'center', textShadowColor: 'rgba(255,255,255,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
});


