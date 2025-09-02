import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometricAvailable] = useState(true);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      // For now, just simulate successful login
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error: any) {
      Alert.alert('Sign In Error', 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    Alert.alert('Biometric Login', 'Biometric authentication would be used here.');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      router.replace('/(tabs)');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = () => {
    Alert.alert('Coming Soon', 'Apple Sign In will be available soon');
  };

  const handleContinueAsGuest = () => {
    router.replace('/(tabs)');
  };

  const goToSignUp = () => {
    router.push('/signup');
  };

  return (
    <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your meditation journey</Text>
            </View>
            
            {biometricAvailable && (
              <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin} activeOpacity={0.8}>
                <Text style={styles.biometricIcon}>📱</Text>
                <Text style={styles.biometricText}>Use Face ID / Touch ID</Text>
              </TouchableOpacity>
            )}
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter your email" 
                  placeholderTextColor="#9CA3AF" 
                  value={email} 
                  onChangeText={setEmail} 
                  keyboardType="email-address" 
                  autoCapitalize="none" 
                  autoCorrect={false} 
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter your password" 
                  placeholderTextColor="#9CA3AF" 
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry 
                  autoCapitalize="none" 
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.signInButton, loading && styles.disabledButton]} 
                onPress={handleSignIn} 
                disabled={loading} 
                activeOpacity={0.8}
              >
                <Text style={styles.signInButtonText}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn} activeOpacity={0.8}>
                <Text style={styles.socialButtonText}>Sign in with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn} activeOpacity={0.8}>
                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.guestButton} onPress={handleContinueAsGuest} activeOpacity={0.8}>
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={goToSignUp} activeOpacity={0.8}>
                <Text style={styles.signUpLink}>Sign Up</Text>
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
  biometricButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    paddingVertical: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    marginBottom: 30, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2 
  },
  biometricIcon: { fontSize: 24, marginRight: 10 },
  biometricText: { fontSize: 16, fontWeight: '500', color: '#374151' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { marginHorizontal: 10, color: '#6B7280', fontSize: 14, fontWeight: '500' },
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
  signInButton: { 
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
  signInButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  socialContainer: { gap: 15, marginBottom: 20 },
  socialButton: { 
    backgroundColor: '#fff', 
    paddingVertical: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2 
  },
  socialButtonText: { color: '#374151', fontSize: 16, fontWeight: '500', textAlign: 'center' },
  guestButton: { 
    backgroundColor: '#F3F4F6', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 20
  },
  guestButtonText: { color: '#374151', fontSize: 16, fontWeight: '600' },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  footerText: { fontSize: 16, color: '#6B7280', marginRight: 4 },
  signUpLink: { fontSize: 16, fontWeight: '600', color: '#8B5CF6' },
});


