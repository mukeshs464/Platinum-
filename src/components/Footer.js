import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer({ onNavigate }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.footer}>
      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        {/* Brand */}
        <View style={styles.brandCol}>
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="hexagon-multiple" size={26} color="#0056FF" />
            <Text style={styles.brandTitle}>Platinum</Text>
          </View>
          <Text style={styles.brandSubtitle}>Your Knowledge. Smarter Answers.</Text>
          <Text style={styles.brandDesc}>
            Enterprise-grade conversational AI platform transforming internal organizational knowledge
            into real-time answers with source citations.
          </Text>
        </View>

        {/* Links Column 1 */}
        <View style={styles.linksCol}>
          <Text style={styles.colTitle}>Product</Text>
          <TouchableOpacity onPress={() => onNavigate?.('how-it-works')}><Text style={styles.linkText}>How It Works</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('organizations')}><Text style={styles.linkText}>For Organizations</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('security')}><Text style={styles.linkText}>Security & Privacy</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('client-portal')}><Text style={styles.linkText}>API & Integrations</Text></TouchableOpacity>
        </View>

        {/* Links Column 2 */}
        <View style={styles.linksCol}>
          <Text style={styles.colTitle}>Portals</Text>
          <TouchableOpacity onPress={() => onNavigate?.('admin')}><Text style={styles.linkText}>Administrator Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('client')}><Text style={styles.linkText}>Client Portal Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('admin-dashboard')}><Text style={styles.linkText}>Admin Dashboard</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('client-dashboard')}><Text style={styles.linkText}>Client Knowledge Upload</Text></TouchableOpacity>
        </View>

        {/* Links Column 3 */}
        <View style={styles.linksCol}>
          <Text style={styles.colTitle}>Compliance</Text>
          <Text style={styles.staticLink}>SOC 2 Type II Certified</Text>
          <Text style={styles.staticLink}>ISO 27001 Standard</Text>
          <Text style={styles.staticLink}>HIPAA & BAA Eligible</Text>
          <Text style={styles.staticLink}>Privacy Policy & Terms</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>
          © 2026 Platinum Software Inc. All rights reserved. Built for secure enterprise operations.
        </Text>
        <View style={styles.systemStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>All Systems Operational</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0F172A',
    width: '100%',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  inner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    marginBottom: 48,
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 30,
  },
  brandCol: {
    flex: 1.5,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 12,
    fontWeight: '500',
  },
  brandDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    maxWidth: 320,
  },
  linksCol: {
    flex: 1,
    gap: 12,
  },
  colTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  linkText: {
    fontSize: 13,
    color: '#94A3B8',
    cursor: 'pointer',
  },
  staticLink: {
    fontSize: 13,
    color: '#64748B',
  },
  bottomBar: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  copyright: {
    fontSize: 12,
    color: '#64748B',
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
});
