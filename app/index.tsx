import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CalmSpace</Text>
      <Text style={styles.subtitle}>Find your calm and start your meditation journey.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/splash')}>
        <Text style={styles.buttonText}>Splash</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9D5FF',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    color: '#6B21A8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
