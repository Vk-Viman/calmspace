import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CommunityRoute() {
  const [selectedTab, setSelectedTab] = useState('Feed');
  const tabs = ['Feed', 'Challenges', 'Badges', 'Groups'];

  const renderFeedContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.postAvatar}>
            <Text style={styles.postInitial}>S</Text>
          </View>
          <View style={styles.postInfo}>
            <Text style={styles.postAuthor}>Sarah M.</Text>
            <Text style={styles.postTime}>2 hours ago</Text>
          </View>
        </View>
        <Text style={styles.postText}>Just completed my morning meditation! Feeling so centered and ready for the day. 🧘‍♀️✨</Text>
        <View style={styles.postStats}>
          <Text style={styles.postStat}>❤️ 12</Text>
          <Text style={styles.postStat}>💬 3</Text>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.postAvatar}>
            <Text style={styles.postInitial}>M</Text>
          </View>
          <View style={styles.postInfo}>
            <Text style={styles.postAuthor}>Mike R.</Text>
            <Text style={styles.postTime}>5 hours ago</Text>
          </View>
        </View>
        <Text style={styles.postText}>Day 7 of my meditation streak! The difference in my stress levels is incredible. Keep going everyone! 💪</Text>
        <View style={styles.postStats}>
          <Text style={styles.postStat}>❤️ 28</Text>
          <Text style={styles.postStat}>💬 8</Text>
        </View>
      </View>
    </View>
  );

  const renderChallengesContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>7-Day Mindfulness Challenge</Text>
        <Text style={styles.challengeDescription}>Meditate for 10 minutes daily for a week</Text>
        <View style={styles.challengeProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
          <Text style={styles.progressText}>4/7 days completed</Text>
        </View>
        <TouchableOpacity style={styles.challengeButton} activeOpacity={0.8}>
          <Text style={styles.challengeButtonText}>Continue Challenge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>Stress Relief Week</Text>
        <Text style={styles.challengeDescription}>Complete 5 stress-relief sessions</Text>
        <View style={styles.challengeProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
          <Text style={styles.progressText}>4/5 sessions completed</Text>
        </View>
        <TouchableOpacity style={styles.challengeButton} activeOpacity={0.8}>
          <Text style={styles.challengeButtonText}>Continue Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBadgesContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.badgesGrid}>
        <View style={styles.badgeItem}>
          <View style={styles.badgeIcon}>🏆</View>
          <Text style={styles.badgeTitle}>First Steps</Text>
          <Text style={styles.badgeDescription}>Complete your first meditation</Text>
          <View style={styles.badgeStatus}>
            <Text style={styles.badgeStatusText}>Earned</Text>
          </View>
        </View>

        <View style={styles.badgeItem}>
          <View style={styles.badgeIcon}>🔥</View>
          <Text style={styles.badgeTitle}>Streak Master</Text>
          <Text style={styles.badgeDescription}>7 days in a row</Text>
          <View style={styles.badgeStatus}>
            <Text style={styles.badgeStatusText}>Earned</Text>
          </View>
        </View>

        <View style={styles.badgeItem}>
          <View style={styles.badgeIcon}>🌟</View>
          <Text style={styles.badgeTitle}>Zen Master</Text>
          <Text style={styles.badgeDescription}>100 total sessions</Text>
          <View style={[styles.badgeStatus, styles.badgeLocked]}>
            <Text style={styles.badgeStatusText}>Locked</Text>
          </View>
        </View>

        <View style={styles.badgeItem}>
          <View style={styles.badgeIcon}>💎</View>
          <Text style={styles.badgeTitle}>Diamond Mind</Text>
          <Text style={styles.badgeDescription}>365 days of practice</Text>
          <View style={[styles.badgeStatus, styles.badgeLocked]}>
            <Text style={styles.badgeStatusText}>Locked</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderGroupsContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <View style={styles.groupAvatar}>
            <Text style={styles.groupInitial}>B</Text>
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Beginners Circle</Text>
            <Text style={styles.groupMembers}>1,234 members</Text>
          </View>
        </View>
        <Text style={styles.groupDescription}>A supportive community for meditation newcomers. Share experiences and get guidance from experienced practitioners.</Text>
        <TouchableOpacity style={styles.groupButton} activeOpacity={0.8}>
          <Text style={styles.groupButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <View style={styles.groupAvatar}>
            <Text style={styles.groupInitial}>A</Text>
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Advanced Meditators</Text>
            <Text style={styles.groupMembers}>567 members</Text>
          </View>
        </View>
        <Text style={styles.groupDescription}>Deep dive into advanced techniques and discuss profound meditation experiences.</Text>
        <TouchableOpacity style={styles.groupButton} activeOpacity={0.8}>
          <Text style={styles.groupButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Feed':
        return renderFeedContent();
      case 'Challenges':
        return renderChallengesContent();
      case 'Badges':
        return renderBadgesContent();
      case 'Groups':
        return renderGroupsContent();
      default:
        return renderFeedContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Community</Text>
            <Text style={styles.subtitle}>Connect with like-minded people</Text>
          </View>

          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab} style={[styles.tab, selectedTab === tab && styles.selectedTab]} onPress={() => setSelectedTab(tab)} activeOpacity={0.8}>
                <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {renderContent()}
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
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 4, marginBottom: 24, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  tab: { flex: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  selectedTab: { backgroundColor: '#8B5CF6' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  selectedTabText: { color: '#fff' },
  contentContainer: { gap: 16 },
  postCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  postInitial: { fontSize: 16, fontWeight: '600', color: '#fff' },
  postInfo: { flex: 1 },
  postAuthor: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  postTime: { fontSize: 14, color: '#6B7280' },
  postText: { fontSize: 16, color: '#374151', lineHeight: 22, marginBottom: 16 },
  postStats: { flexDirection: 'row', gap: 16 },
  postStat: { fontSize: 14, color: '#6B7280' },
  challengeCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
  challengeTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 8 },
  challengeDescription: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  challengeProgress: { marginBottom: 16 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  progressText: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  challengeButton: { backgroundColor: '#8B5CF6', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  challengeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  badgeItem: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '48%', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
  badgeIcon: { fontSize: 48, marginBottom: 12 },
  badgeTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  badgeDescription: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 16 },
  badgeStatus: { backgroundColor: '#10B981', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeStatusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  badgeLocked: { backgroundColor: '#9CA3AF' },
  groupCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
  groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  groupAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  groupInitial: { fontSize: 20, fontWeight: '600', color: '#fff' },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  groupMembers: { fontSize: 14, color: '#6B7280' },
  groupDescription: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 20 },
  groupButton: { backgroundColor: '#8B5CF6', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  groupButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});


