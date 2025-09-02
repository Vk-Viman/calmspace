import React from 'react';
import { StyleSheet, View } from 'react-native';

// Tab bar background component for better styling
export default function TabBarBackground() {
  return <View style={styles.background} />;
}

export function useBottomTabOverflow() {
  return 0;
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});
