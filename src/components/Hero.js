import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function Hero({ onOpenChat }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.heroInner}>
        {/* Top Announcement Pill */}
        <TouchableOpacity 
          style={styles.announcementPill}
          activeOpacity={0.8}
          onPress={onOpenChat}
        >
          <View style={styles.pillSparkle}>
            <Ionicons name="sparkles" size={14} color="#0056FF" />
          </View>
          <Text style={styles.announcementText}>
            Introducing Platinum AI Assistant • Try it live
          </Text>
          <Feather name="arrow-right" size={14} color="#0056FF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Tagline */}
        <Text style={styles.tagline}>AI CHATBOT PLATFORM</Text>

        {/* Main Title */}
        <Text style={styles.title}>
          Your Organization's Knowledge.{'\n'}
          <Text style={styles.titleHighlight}>Instant Answers.</Text>
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Platinum helps organizations make their internal knowledge, policies, and documents
          easily accessible through a secure, enterprise-grade AI chatbot.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            activeOpacity={0.85}
            onPress={onOpenChat}
          >
            <Text style={styles.primaryBtnText}>Ask Platinum AI</Text>
            <MaterialCommunityIcons name="robot" size={18} color="#FFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.85}>
            <Text style={styles.secondaryBtnText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Enterprise Feature Badges */}
        <View style={[styles.featuresRow, isMobile && styles.featuresRowMobile]}>
          <FeatureItem
            icon={<MaterialCommunityIcons name="shield-check" size={24} color="#0056FF" />}
            title="Secure & Private"
            subtitle="Your data stays yours"
          />
          <FeatureItem
            icon={<MaterialCommunityIcons name="power-plug" size={24} color="#0056FF" />}
            title="Easy Integration"
            subtitle="API & documentation"
          />
          <FeatureItem
            icon={<MaterialCommunityIcons name="account-group" size={24} color="#0056FF" />}
            title="Built for Organizations"
            subtitle="Scalable and reliable"
          />
        </View>

        {/* Floating Assistant Notification Banner */}
        <TouchableOpacity 
          style={styles.assistantTeaserBanner}
          activeOpacity={0.9}
          onPress={onOpenChat}
        >
          <View style={styles.teaserLeft}>
            <View style={styles.teaserAvatar}>
              <MaterialCommunityIcons name="robot" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.teaserTextCol}>
              <Text style={styles.teaserHeading}>
                Platinum AI Assistant is ready on this page!
              </Text>
              <Text style={styles.teaserDesc}>
                Click the circular button at the bottom-right corner to ask company policy questions in real-time.
              </Text>
            </View>
          </View>
          <View style={styles.teaserAction}>
            <Text style={styles.teaserActionText}>Open Assistant</Text>
            <Feather name="chevron-right" size={16} color="#0056FF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FeatureItem = ({ icon, title, subtitle }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconBox}>{icon}</View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    alignItems: 'center',
    width: '100%',
  },
  heroInner: {
    maxWidth: 900,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  announcementPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 24,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  pillSparkle: {
    marginRight: 8,
  },
  announcementText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0056FF',
  },
  tagline: {
    color: '#0056FF',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 62,
    marginBottom: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  titleHighlight: {
    color: '#0056FF',
  },
  subtitle: {
    fontSize: 18,
    color: '#475569',
    lineHeight: 30,
    marginBottom: 36,
    maxWidth: 680,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    flexWrap: 'wrap',
    gap: 16,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#0056FF',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  secondaryBtnText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    gap: 28,
    marginBottom: 40,
    paddingVertical: 12,
  },
  featuresRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureTextContainer: {
    alignItems: 'flex-start',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  /* Teaser Banner */
  assistantTeaserBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: 20,
    paddingVertical: 14,
    maxWidth: 760,
    width: '100%',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  teaserLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teaserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  teaserTextCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  teaserHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  teaserDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  teaserAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  teaserActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0056FF',
    marginRight: 4,
  },
});
