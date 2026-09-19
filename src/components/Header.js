import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({ activeSection = 'home', onNavigate }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 820;

  return (
    <View style={styles.header}>
      {/* Logo Area */}
      <TouchableOpacity 
        style={styles.logoContainer}
        onPress={() => onNavigate?.('home')}
        activeOpacity={0.8}
      >
        <View style={styles.logoIcon}>
          <MaterialCommunityIcons name="hexagon-multiple" size={32} color="#0056FF" />
        </View>
        <View>
          <Text style={styles.logoText}>Platinum</Text>
          <Text style={styles.logoSubtext}>Your Knowledge. Smarter Answers.</Text>
        </View>
      </TouchableOpacity>

      {/* Navigation (Desktop & Tablet) */}
      {!isMobile && (
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => onNavigate?.('home')}>
            <Text style={[styles.navLink, activeSection === 'home' && styles.navLinkActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate?.('how-it-works')}>
            <Text style={[styles.navLink, activeSection === 'how-it-works' && styles.navLinkActive]}>
              How It Works
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate?.('organizations')}>
            <Text style={[styles.navLink, activeSection === 'organizations' && styles.navLinkActive]}>
              For Organizations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate?.('security')}>
            <Text style={[styles.navLink, activeSection === 'security' && styles.navLinkActive]}>
              Security
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate?.('contact')}>
            <Text style={[styles.navLink, activeSection === 'contact' && styles.navLinkActive]}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Action Buttons: Admin Login & Client Login */}
      <View style={styles.actionsContainer}>
        {!isMobile && (
          <TouchableOpacity 
            style={styles.adminLoginBtn}
            onPress={() => onNavigate?.('admin')}
            activeOpacity={0.8}
          >
            <Text style={styles.adminLoginText}>Admin Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.clientLoginBtn}
          onPress={() => onNavigate?.('client')}
          activeOpacity={0.85}
        >
          <Text style={styles.clientLoginText}>Client Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 10.5,
    color: '#475569',
    marginTop: 2,
    fontWeight: '500',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    fontSize: 14,
    color: '#334155',
    marginHorizontal: 14,
    fontWeight: '600',
    paddingVertical: 4,
    cursor: 'pointer',
  },
  navLinkActive: {
    color: '#0056FF',
    fontWeight: '800',
    borderBottomWidth: 2,
    borderBottomColor: '#0056FF',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminLoginBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#0056FF',
    marginRight: 12,
    cursor: 'pointer',
  },
  adminLoginText: {
    color: '#0056FF',
    fontWeight: '700',
    fontSize: 13.5,
  },
  clientLoginBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#0056FF',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    cursor: 'pointer',
  },
  clientLoginText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
  },
});
