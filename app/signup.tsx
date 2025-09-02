import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      Alert.alert('Success', 'Account created!');
      router.replace('/login');
      setLoading(false);
    }, 800);
  };

  const goToSignIn = () => {
    router.replace('/login');
  };

  return (
    <LinearGradient colors={['#DBEAFE', '#E9D5FF']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to start your meditation journey</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Your name" 
                  placeholderTextColor="#9CA3AF" 
                  value={name} 
                  onChangeText={setName} 
                  autoCapitalize="words" 
                  accessibilityLabel="Name"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Email address" 
                  placeholderTextColor="#9CA3AF" 
                  value={email} 
                  onChangeText={setEmail} 
                  keyboardType="email-address" 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                  accessibilityLabel="Email address"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Password" 
                  placeholderTextColor="#9CA3AF" 
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry 
                  autoCapitalize="none" 
                  accessibilityLabel="Password"
                />
              </View>
              <TouchableOpacity 
                style={[styles.signUpButton, loading && styles.disabledButton]} 
                onPress={handleSignUp} 
                disabled={loading} 
                activeOpacity={0.8}
                accessibilityLabel="Sign Up"
              >
                <Text style={styles.signUpButtonText}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={goToSignIn} activeOpacity={0.8} accessibilityLabel="Sign In">
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { paddingHorizontal: 40, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: '700', color: '#1F2937', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
  form: { marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    fontSize: 16, 
    color: '#1F2937', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  signUpButton: { 
    backgroundColor: '#8B5CF6', 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  disabledButton: { opacity: 0.6 },
  signUpButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  footerText: { fontSize: 16, color: '#6B7280', marginRight: 4 },
  signInLink: { fontSize: 16, fontWeight: '600', color: '#8B5CF6' },
});
