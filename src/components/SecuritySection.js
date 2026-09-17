import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const SECURITY_PILLARS = [
  {
    icon: 'shield-lock-outline',
    title: 'Zero Model Training',
    description:
      'Your proprietary files, Slack messages, and internal policies are never used to train public or foundation AI models. Your IP remains exclusively yours.',
    badge: '100% Private',
    color: '#0056FF',
    bgColor: '#EFF6FF',
  },
  {
    icon: 'database-lock-outline',
    title: 'Isolated Vector Partitions',
    description:
      'Every organization has an isolated vector database partition with dedicated encryption keys (AES-256 at rest, TLS 1.3 in flight). Zero cross-tenant data leakage.',
    badge: 'Cryptographic Isolation',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  {
    icon: 'certificate-outline',
    title: 'Enterprise Compliance',
    description:
      'Engineered to meet SOC 2 Type II, ISO 27001, HIPAA, and GDPR standards. Detailed audit logging tracks every document read and question asked.',
    badge: 'SOC2 & HIPAA Ready',
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
  {
    icon: 'account-key-outline',
    title: 'Role-Based Access Control (RBAC)',
    description:
      'Synchronizes with your existing identity provider (Okta, Azure AD, Google Workspace) so employees only receive answers from documents they have permission to view.',
    badge: 'SSO & SAML 2.0',
    color: '#0284C7',
    bgColor: '#F0F9FF',
  },
];

export default function SecuritySection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.taglineBadge}>
          <MaterialCommunityIcons name="shield-check" size={14} color="#0056FF" style={{ marginRight: 6 }} />
          <Text style={styles.tagline}>ENTERPRISE SECURITY</Text>
        </View>
        <Text style={styles.title}>Bank-Grade Security Built from Day One</Text>
        <Text style={styles.subtitle}>
          We understand that enterprise documentation contains sensitive IP. Platinum AI is built
          with a zero-trust architecture to ensure complete privacy, compliance, and control.
        </Text>
      </View>

      {/* Security Pillars 2x2 Grid */}
      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {SECURITY_PILLARS.map((pillar, idx) => (
          <View key={idx} style={[styles.card, isMobile && styles.cardMobile]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: pillar.bgColor }]}>
                <MaterialCommunityIcons name={pillar.icon} size={24} color={pillar.color} />
              </View>
              <View style={[styles.badge, { backgroundColor: pillar.bgColor }]}>
                <Text style={[styles.badgeText, { color: pillar.color }]}>{pillar.badge}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{pillar.title}</Text>
            <Text style={styles.cardDesc}>{pillar.description}</Text>
          </View>
        ))}
      </View>

      {/* Compliance Trust Banner */}
      <View style={[styles.trustBanner, isMobile && styles.trustBannerMobile]}>
        <View style={styles.trustItem}>
          <Feather name="check-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.trustText}>SOC 2 Type II Certified</Text>
        </View>
        <View style={styles.trustItem}>
          <Feather name="check-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.trustText}>HIPAA & BAA Eligible</Text>
        </View>
        <View style={styles.trustItem}>
          <Feather name="check-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.trustText}>GDPR & CCPA Compliant</Text>
        </View>
        <View style={styles.trustItem}>
          <Feather name="check-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.trustText}>256-Bit Data Encryption</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    maxWidth: 780,
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  tagline: {
    color: '#0056FF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
  },

  /* Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1100,
    width: '100%',
    gap: 24,
    marginBottom: 40,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  cardMobile: {
    flexBasis: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },

  /* Trust Banner */
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    maxWidth: 1100,
    width: '100%',
    flexWrap: 'wrap',
    gap: 16,
  },
  trustBannerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
  },
});
