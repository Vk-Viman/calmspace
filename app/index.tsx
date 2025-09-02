import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Navigate to splash screen on app start
    try {
      router.replace('/splash');
    } catch (error) {
      console.log('Navigation error:', error);
      // Fallback navigation
      router.push('/splash');
    }
  }, []);
  
  return <View />;
}
