import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function Hero({ onExplore, onContact }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.heroInner}>
        {/* Top Announcement Pill */}
        <View style={styles.announcementPill}>
          <View style={styles.pillSparkle}>
            <Ionicons name="sparkles" size={14} color="#0056FF" />
          </View>
          <Text style={styles.announcementText}>
            Enterprise Knowledge & Policy Intelligence Platform
          </Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>AI KNOWLEDGE RETRIEVAL & AUTOMATION</Text>

        {/* Main Title */}
        <Text style={styles.title}>
          Your Organization's Knowledge.{'\n'}
          <Text style={styles.titleHighlight}>Instant, Verified Answers.</Text>
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Platinum unifies your enterprise policies, SOPs, and internal documents into a secure,
          instant-answer intelligence layer. Cut support tickets by 80%+ while keeping your data 100% private.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            activeOpacity={0.85}
            onPress={onContact}
          >
            <Text style={styles.primaryBtnText}>Book Enterprise Demo</Text>
            <Feather name="arrow-right" size={18} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryBtn} 
            activeOpacity={0.85}
            onPress={onExplore}
          >
            <Text style={styles.secondaryBtnText}>See How It Works</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Enterprise Feature Badges */}
        <View style={[styles.featuresRow, isMobile && styles.featuresRowMobile]}>
          <FeatureItem
            icon={<MaterialCommunityIcons name="shield-check" size={24} color="#0056FF" />}
            title="Secure & Private"
            subtitle="Your data stays strictly yours"
          />
          <FeatureItem
            icon={<MaterialCommunityIcons name="file-document-check-outline" size={24} color="#0056FF" />}
            title="100% Citation Backed"
            subtitle="Exact document & page sources"
          />
          <FeatureItem
            icon={<MaterialCommunityIcons name="account-group" size={24} color="#0056FF" />}
            title="Built for Scale"
            subtitle="Role-based access & SSO ready"
          />
        </View>

        {/* Enterprise Highlights Trust Banner */}
        <View style={[styles.trustCard, isMobile && styles.trustCardMobile]}>
          <View style={styles.trustItem}>
            <View style={[styles.trustIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <Feather name="zap" size={18} color="#0056FF" />
            </View>
            <View style={styles.trustItemText}>
              <Text style={styles.trustHeading}>&lt; 1s Latency</Text>
              <Text style={styles.trustSub}>Sub-second query retrieval</Text>
            </View>
          </View>

          <View style={styles.trustDivider} />

          <View style={styles.trustItem}>
            <View style={[styles.trustIconCircle, { backgroundColor: '#F0FDF4' }]}>
              <MaterialCommunityIcons name="lock-check-outline" size={18} color="#16A34A" />
            </View>
            <View style={styles.trustItemText}>
              <Text style={styles.trustHeading}>Zero Training</Text>
              <Text style={styles.trustSub}>Data never trains public LLMs</Text>
            </View>
          </View>

          <View style={styles.trustDivider} />

          <View style={styles.trustItem}>
            <View style={[styles.trustIconCircle, { backgroundColor: '#FAF5FF' }]}>
              <MaterialCommunityIcons name="certificate-outline" size={18} color="#9333EA" />
            </View>
            <View style={styles.trustItemText}>
              <Text style={styles.trustHeading}>SOC 2 Ready</Text>
              <Text style={styles.trustSub}>Encrypted AES-256 at rest</Text>
            </View>
          </View>
        </View>
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
    paddingVertical: 56,
    alignItems: 'center',
    width: '100%',
  },
  heroInner: {
    maxWidth: 920,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  announcementPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 26,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  pillSparkle: {
    marginRight: 8,
  },
  announcementText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0056FF',
    letterSpacing: 0.2,
  },
  tagline: {
    color: '#0056FF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  title: {
    fontSize: 50,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 60,
    marginBottom: 22,
    textAlign: 'center',
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255, 255, 255, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  titleHighlight: {
    color: '#0056FF',
  },
  subtitle: {
    fontSize: 18,
    color: '#1E293B',
    lineHeight: 30,
    marginBottom: 38,
    maxWidth: 720,
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 44,
    flexWrap: 'wrap',
    gap: 16,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#0056FF',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    cursor: 'pointer',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    cursor: 'pointer',
  },
  secondaryBtnText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 36,
  },
  featuresRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 240,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
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
    fontSize: 12.5,
    color: '#475569',
    marginTop: 2,
  },

  /* Trust Highlights Card */
  trustCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 18,
    paddingHorizontal: 28,
    maxWidth: 860,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  trustCardMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trustItemText: {
    alignItems: 'flex-start',
  },
  trustHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  trustSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  trustDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
});
