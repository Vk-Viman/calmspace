import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileRoute() {
  const [profile, setProfile] = useState({
    fullName: 'Kavinda',
    email: 'kavinda@example.com',
    bio: 'I love coding and building things!',
    age: 25,
    avatar: '👤',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState({
    fullName: 'Kavinda',
    email: 'kavinda@example.com',
    bio: 'I love coding and building things!',
    age: 25,
    avatar: '👤',
  });

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would sign out from Firebase
            router.replace('/login');
          }
        }
      ]
    );
  };

  const cancelEdit = () => {
    setEditProfile(profile);
    setIsEditMode(false);
  };

  // Calculate profile completion percentage
  const getProfileCompletion = () => {
    const fields = [profile.fullName, profile.email, profile.bio, profile.age, profile.avatar];
    const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const profileCompletion = getProfileCompletion();

  const renderEditSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={editProfile.fullName}
          onChangeText={(text) => setEditProfile({ ...editProfile, fullName: text })}
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={editProfile.email}
          onChangeText={(text) => setEditProfile({ ...editProfile, email: text })}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          value={editProfile.age.toString()}
          onChangeText={(text) => setEditProfile({ ...editProfile, age: parseInt(text) || 0 })}
          placeholder="Enter your age"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={styles.input}
          value={editProfile.bio}
          onChangeText={(text) => setEditProfile({ ...editProfile, bio: text })}
          placeholder="Tell us about yourself"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.editButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit} activeOpacity={0.8}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSettingSection = (title: string, items: { label: string; icon: string; onPress?: () => void }[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress} activeOpacity={0.7}>
          <Text style={styles.settingIcon}>{item.icon}</Text>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>K</Text>
            </View>
            <Text style={styles.userName}>Kavinda</Text>
            <Text style={styles.userEmail}>kavinda@example.com</Text>
            <Text style={styles.privacyNote}>Your data is private and secure</Text>
          </View>

          {renderSettingSection('Account', [
            { label: 'Personal Information', icon: '👤' },
            { label: 'Change Password', icon: '🔒' },
            { label: 'Email Preferences', icon: '📧' },
            { label: 'Subscription', icon: '💎' },
          ])}

          {renderSettingSection('Privacy & Security', [
            { label: 'Privacy Settings', icon: '🔐' },
            { label: 'Data Usage', icon: '📊' },
            { label: 'Two-Factor Auth', icon: '🛡️' },
            { label: 'App Permissions', icon: '📱' },
          ])}

          {renderSettingSection('App Settings', [
            { label: 'Notifications', icon: '🔔' },
            { label: 'Sound & Haptics', icon: '🔊' },
            { label: 'Language', icon: '🌐' },
            { label: 'Theme', icon: '🎨' },
          ])}

          {renderSettingSection('Support & Feedback', [
            { label: 'Help Center', icon: '❓' },
            { label: 'Contact Support', icon: '📞' },
            { label: 'Send Feedback', icon: '💬' },
            { label: 'Rate App', icon: '⭐' },
          ])}

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
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
  profileImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  profileInitial: { fontSize: 32, fontWeight: '700', color: '#fff' },
  userName: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  userEmail: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  privacyNote: { fontSize: 14, color: '#8B5CF6', textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 12, paddingHorizontal: 4 },
  settingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, marginBottom: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  settingIcon: { fontSize: 20, marginRight: 16, width: 24 },
  settingLabel: { flex: 1, fontSize: 16, color: '#374151', fontWeight: '500' },
  settingArrow: { fontSize: 18, color: '#9CA3AF' },
  signOutButton: { backgroundColor: '#EF4444', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  signOutText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  versionInfo: { alignItems: 'center' },
  versionText: { fontSize: 14, color: '#9CA3AF' },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: '#374151', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


