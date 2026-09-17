import React, { useRef, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Components
import Header from './src/components/Header';
import Hero from './src/components/Hero';
import GlobalBackground from './src/components/GlobalBackground';
import HowItWorks from './src/components/HowItWorks';
import ForOrganizations from './src/components/ForOrganizations';
import SecuritySection from './src/components/SecuritySection';
import TestimonialsCarousel from './src/components/TestimonialsCarousel';
import ContactSection from './src/components/ContactSection';
import Footer from './src/components/Footer';
import ChatbotPopup from './src/components/ChatbotPopup';

// Portal Views
import AdminPortalView from './src/components/AdminPortalView';
import ClientPortalView from './src/components/ClientPortalView';

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { height: windowHeight } = Dimensions.get('window');

  // View state: 'landing' | 'admin' | 'client'
  const [currentView, setCurrentView] = useState('landing');
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Section Y coordinates for smooth scroll
  const sectionPositions = useRef({
    home: 0,
    'how-it-works': 0,
    organizations: 0,
    security: 0,
    testimonials: 0,
    contact: 0,
  }).current;

  // The scroll distance for the background animation sequence
  const scrollDistance = windowHeight * 1.2;

  const handleNavigate = (destination) => {
    if (destination === 'admin' || destination === 'admin-dashboard') {
      setCurrentView('admin');
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
      return;
    }

    if (destination === 'client' || destination === 'client-dashboard' || destination === 'client-portal') {
      setCurrentView('client');
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'landing') {
      setCurrentView('landing');
    }

    setActiveSection(destination);

    // Smooth scroll to target section in web
    if (typeof document !== 'undefined') {
      if (destination === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(destination);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const targetY = sectionPositions[destination] || 0;
    setTimeout(() => {
      scrollViewRef.current?.scrollTo?.({ y: targetY, animated: true });
    }, 50);
  };

  // Render Admin Portal View
  if (currentView === 'admin') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />
        <AdminPortalView onBackToLanding={() => setCurrentView('landing')} />
        <ChatbotPopup
          isOpen={isChatOpen}
          onToggle={setIsChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </SafeAreaView>
    );
  }

  // Render Client Portal View
  if (currentView === 'client') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />
        <ClientPortalView onBackToLanding={() => setCurrentView('landing')} />
        <ChatbotPopup
          isOpen={isChatOpen}
          onToggle={setIsChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </SafeAreaView>
    );
  }

  // Render Full Landing Page
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* CINEMATIC PSEUDO-RANDOM GLOBAL BACKGROUND SCROLL SYSTEM */}
        <GlobalBackground scrollY={scrollY} activeSection={activeSection} />

        {/* FOREGROUND CONTENT */}
        <View style={styles.foreground}>
          {/* SECTION 1: HERO */}
          <View
            nativeID="home"
            id="home"
            style={[styles.heroWrapper, { minHeight: windowHeight }]}
            onLayout={(e) => {
              sectionPositions.home = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.content}>
              <Header
                activeSection={activeSection}
                onNavigate={handleNavigate}
              />
              <Hero onOpenChat={() => setIsChatOpen(true)} />
            </View>
          </View>

          {/* SOLID BACKGROUND SECTIONS (Smoothly covers the background animation) */}
          <View style={styles.solidBody}>
            {/* SECTION 2: HOW IT WORKS */}
            <View
              nativeID="how-it-works"
              id="how-it-works"
              onLayout={(e) => {
                sectionPositions['how-it-works'] = e.nativeEvent.layout.y;
              }}
              style={styles.content}
            >
              <HowItWorks />
            </View>

            <View style={styles.sectionDivider} />

            {/* SECTION 3: FOR ORGANIZATIONS */}
            <View
              nativeID="organizations"
              id="organizations"
              onLayout={(e) => {
                sectionPositions.organizations = e.nativeEvent.layout.y;
              }}
              style={styles.content}
            >
              <ForOrganizations onOpenChat={() => setIsChatOpen(true)} />
            </View>

            <View style={styles.sectionDivider} />

            {/* SECTION 4: SECURITY & COMPLIANCE */}
            <View
              nativeID="security"
              id="security"
              onLayout={(e) => {
                sectionPositions.security = e.nativeEvent.layout.y;
              }}
              style={styles.content}
            >
              <SecuritySection />
            </View>

            <View style={styles.sectionDivider} />

            {/* SECTION 5: CUSTOMER STORIES & TESTIMONIALS CAROUSEL */}
            <View
              nativeID="testimonials"
              id="testimonials"
              onLayout={(e) => {
                sectionPositions.testimonials = e.nativeEvent.layout.y;
              }}
              style={styles.content}
            >
              <TestimonialsCarousel />
            </View>

            <View style={styles.sectionDivider} />

            {/* SECTION 6: CONTACT & DEMO REQUEST */}
            <View
              nativeID="contact"
              id="contact"
              onLayout={(e) => {
                sectionPositions.contact = e.nativeEvent.layout.y;
              }}
              style={styles.content}
            >
              <ContactSection />
            </View>

            {/* SECTION 7: ENTERPRISE FOOTER */}
            <Footer onNavigate={handleNavigate} />
          </View>
        </View>
      </Animated.ScrollView>

      {/* FLOATING INTERACTIVE PLATINUM AI ASSISTANT POPUP */}
      <ChatbotPopup
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFCFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  foreground: {
    width: '100%',
    zIndex: 1,
  },
  heroWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  solidBody: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  sectionDivider: {
    width: '100%',
    maxWidth: 1100,
    height: 1,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
