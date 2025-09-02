import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PersonalizedPlanScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireData, setQuestionnaireData] = useState<any>({ mood: '', stress: 5, sleep: 3, focus: 4, goals: [] });
  const [showPlan, setShowPlan] = useState(false);

  const questionnaireSteps: any[] = [
    { id: 'mood', title: 'How are you feeling today?', type: 'mood', options: [
      { label: '😊 Happy & Energetic', value: 'happy' },
      { label: '😐 Neutral & Balanced', value: 'neutral' },
      { label: '😔 Stressed & Anxious', value: 'stressed' },
      { label: '😴 Tired & Low Energy', value: 'tired' },
      { label: '😡 Irritated & Frustrated', value: 'irritated' },
    ]},
    { id: 'stress', title: "What's your current stress level?", type: 'slider', min: 0, max: 10, labels: ['Very Calm', 'Overwhelmed'] },
    { id: 'sleep', title: 'How well did you sleep last night?', type: 'rating', options: [
      { label: '😴 Poor', value: 1 }, { label: '😐 Fair', value: 2 }, { label: '😊 Good', value: 3 }, { label: '😄 Excellent', value: 4 }, { label: '🌟 Perfect', value: 5 },
    ]},
    { id: 'focus', title: 'How focused do you feel right now?', type: 'rating', options: [
      { label: '😵‍💫 Scattered', value: 1 }, { label: '😐 Somewhat Focused', value: 2 }, { label: '🎯 Focused', value: 3 }, { label: '🚀 Very Focused', value: 4 }, { label: '🧘‍♂️ Laser Sharp', value: 5 },
    ]},
    { id: 'goals', title: 'What are your main wellness goals?', type: 'multiSelect', options: [
      { label: 'Better Sleep', value: 'sleep', icon: '😴' }, { label: 'Stress Relief', value: 'stress', icon: '🧘‍♀️' }, { label: 'Improved Focus', value: 'focus', icon: '🎯' }, { label: 'Emotional Balance', value: 'emotional', icon: '😌' }, { label: 'Mindfulness', value: 'mindfulness', icon: '🌿' }, { label: 'Anxiety Reduction', value: 'anxiety', icon: '💆‍♀️' },
    ]},
  ];

  const handleAnswer = (stepId: string, value: any) => setQuestionnaireData((prev: any) => ({ ...prev, [stepId]: value }));
  const handleNext = () => currentStep < questionnaireSteps.length - 1 ? setCurrentStep(currentStep + 1) : setShowPlan(true);
  const handleBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleBackToHome = () => {
    router.back();
  };

  const renderQuestion = () => {
    const step = questionnaireSteps[currentStep];
    if (!step) return null;
    if (step.type === 'mood') {
      return (
        <View style={styles.optionsContainer}>
          {step.options.map((option: any) => (
            <TouchableOpacity key={option.value} style={[styles.optionButton, questionnaireData[step.id] === option.value && styles.selectedOption]} onPress={() => handleAnswer(step.id, option.value)} activeOpacity={0.8}>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    if (step.type === 'slider') {
      return (
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{step.labels[0]}</Text>
            <Text style={styles.sliderLabel}>{step.labels[1]}</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${(questionnaireData[step.id] / step.max) * 100}%` }]} />
            <TouchableOpacity style={[styles.sliderThumb, { left: `${(questionnaireData[step.id] / step.max) * 100 - 2}%` }]} onPress={() => handleAnswer(step.id, questionnaireData[step.id] === step.max ? step.min : questionnaireData[step.id] + 1)} />
          </View>
          <Text style={styles.sliderValue}>{questionnaireData[step.id]}/{step.max}</Text>
        </View>
      );
    }
    if (step.type === 'rating') {
      return (
        <View style={styles.ratingContainer}>
          {step.options.map((option: any) => (
            <TouchableOpacity key={option.value} style={[styles.ratingButton, questionnaireData[step.id] === option.value && styles.selectedRating]} onPress={() => handleAnswer(step.id, option.value)} activeOpacity={0.8}>
              <Text style={styles.ratingEmoji}>{option.label.split(' ')[0]}</Text>
              <Text style={styles.ratingLabel}>{option.label.split(' ').slice(1).join(' ')}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    if (step.type === 'multiSelect') {
      return (
        <View style={styles.multiSelectContainer}>
          {step.options.map((option: any) => (
            <TouchableOpacity key={option.value} style={[styles.multiSelectButton, (questionnaireData[step.id] || []).includes(option.value) && styles.selectedMultiSelect]} onPress={() => {
              const currentGoals = questionnaireData[step.id] || [];
              const newGoals = currentGoals.includes(option.value) ? currentGoals.filter((g: any) => g !== option.value) : [...currentGoals, option.value];
              handleAnswer(step.id, newGoals);
            }} activeOpacity={0.8}>
              <Text style={styles.multiSelectIcon}>{option.icon}</Text>
              <Text style={styles.multiSelectLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderPlan = () => (
    <View style={styles.planContainer}>
      <Text style={styles.planTitle}>Your Personalized Meditation Plan</Text>
      <Text style={styles.planSubtitle}>Based on your responses, here's your recommended weekly routine:</Text>
      <View style={styles.recommendationsContainer}>
        {[
          { type: 'Sleep', sessions: 3, icon: '😴', time: 'Evening' },
          { type: 'Stress Relief', sessions: 2, icon: '🧘‍♀️', time: 'Morning & Afternoon' },
          { type: 'Focus', sessions: 1, icon: '🎯', time: 'Morning' },
        ].map((rec, index) => (
          <View key={index} style={styles.recommendationCard}>
            <Text style={styles.recommendationIcon}>{rec.icon}</Text>
            <View style={styles.recommendationInfo}>
              <Text style={styles.recommendationType}>{rec.type}</Text>
              <Text style={styles.recommendationDetails}>{rec.sessions} sessions • {rec.time}</Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.startPlanButton} activeOpacity={0.8}>
        <Text style={styles.startPlanButtonText}>Start My Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backToQuestionnaire} onPress={() => setShowPlan(false)} activeOpacity={0.8}>
        <Text style={styles.backToQuestionnaireText}>← Back to Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );

  if (showPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToHome} activeOpacity={0.8}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>{renderPlan()}</ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E9D5FF', '#DBEAFE']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Personalized Plan</Text>
            <Text style={styles.subtitle}>Let's create your perfect meditation routine</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${((currentStep + 1) / questionnaireSteps.length) * 100}%` }]} /></View>
            <Text style={styles.progressText}>Step {currentStep + 1} of {questionnaireSteps.length}</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{questionnaireSteps[currentStep].title}</Text>
            {renderQuestion()}
          </View>
          <View style={styles.navigationContainer}>
            {currentStep > 0 && (<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}><Text style={styles.backButtonText}>Back</Text></TouchableOpacity>)}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
              <Text style={styles.nextButtonText}>{currentStep === questionnaireSteps.length - 1 ? 'Generate Plan' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 10 
  },
  backButton: { 
    backgroundColor: 'rgba(255,255,255,0.8)', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  backButtonText: { 
    color: '#8B5CF6', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  scrollContent: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
  progressContainer: { marginBottom: 30 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 10, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 4 },
  progressText: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  questionContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 30, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  questionTitle: { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 24, textAlign: 'center' },
  optionsContainer: { gap: 16 },
  optionButton: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, borderWidth: 2, borderColor: 'transparent' },
  selectedOption: { backgroundColor: '#F3F4F6', borderColor: '#8B5CF6' },
  optionText: { fontSize: 16, color: '#374151', textAlign: 'center' },
  sliderContainer: { alignItems: 'center' },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  sliderLabel: { fontSize: 14, color: '#6B7280' },
  sliderTrack: { width: '100%', height: 12, backgroundColor: '#E5E7EB', borderRadius: 6, position: 'relative', marginBottom: 16 },
  sliderFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 6 },
  sliderThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#8B5CF6', position: 'absolute', top: '50%', transform: [{ translateY: -12 }] },
  sliderValue: { fontSize: 18, fontWeight: '600', color: '#8B5CF6' },
  ratingContainer: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', gap: 12 },
  ratingButton: { alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: 'transparent', minWidth: 80 },
  selectedRating: { backgroundColor: '#F3F4F6', borderColor: '#8B5CF6' },
  ratingEmoji: { fontSize: 24, marginBottom: 8 },
  ratingLabel: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  multiSelectContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  multiSelectButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, borderWidth: 2, borderColor: 'transparent', minWidth: 120 },
  selectedMultiSelect: { backgroundColor: '#F3F4F6', borderColor: '#8B5CF6' },
  multiSelectIcon: { fontSize: 20, marginRight: 8 },
  multiSelectLabel: { fontSize: 14, color: '#374151' },
  navigationContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  nextButton: { backgroundColor: '#8B5CF6', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, flex: 1 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  planContainer: { alignItems: 'center' },
  planTitle: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginBottom: 12, textAlign: 'center' },
  planSubtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  recommendationsContainer: { gap: 16, marginBottom: 30 },
  recommendationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, minWidth: 300 },
  recommendationIcon: { fontSize: 32, marginRight: 16 },
  recommendationInfo: { flex: 1 },
  recommendationType: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  recommendationDetails: { fontSize: 14, color: '#6B7280' },
  startPlanButton: { backgroundColor: '#8B5CF6', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 32, marginBottom: 20 },
  startPlanButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  backToQuestionnaire: { padding: 16 },
  backToQuestionnaireText: { color: '#8B5CF6', fontSize: 16, fontWeight: '500' },
});


