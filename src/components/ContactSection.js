import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContactSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedSize, setSelectedSize] = useState('51-200');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !name.trim()) return;
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.innerBox, isMobile && styles.innerBoxMobile]}>
        {/* Left Side: Info & Benefits */}
        <View style={[styles.leftSide, isMobile && styles.fullWidth]}>
          <View style={styles.taglineBadge}>
            <Feather name="mail" size={14} color="#0056FF" style={{ marginRight: 6 }} />
            <Text style={styles.tagline}>GET IN TOUCH</Text>
          </View>

          <Text style={styles.title}>Ready to Empower Your Workforce with AI?</Text>

          <Text style={styles.subtitle}>
            Speak with an enterprise AI specialist to see how Platinum AI can index your company's
            documents in less than 48 hours with guaranteed SOC2 compliance.
          </Text>

          <View style={styles.benefitsList}>
            <BenefitRow text="Dedicated onboarding manager and vector pipeline engineer" />
            <BenefitRow text="Complimentary security architecture review & BAA drafting" />
            <BenefitRow text="Custom trial with up to 250 enterprise documents included" />
          </View>

          <View style={styles.directContactRow}>
            <View style={styles.contactItem}>
              <Feather name="mail" size={16} color="#0056FF" style={{ marginRight: 8 }} />
              <Text style={styles.contactItemText}>enterprise@platinum.ai</Text>
            </View>
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={16} color="#0056FF" style={{ marginRight: 8 }} />
              <Text style={styles.contactItemText}>San Francisco • New York • London</Text>
            </View>
          </View>
        </View>

        {/* Right Side: Demo Request Form */}
        <View style={[styles.rightSide, isMobile && styles.fullWidth]}>
          <View style={styles.formCard}>
            {submitted ? (
              <View style={styles.successState}>
                <View style={styles.successIconCircle}>
                  <Feather name="check" size={28} color="#059669" />
                </View>
                <Text style={styles.successTitle}>Demo Request Received!</Text>
                <Text style={styles.successDesc}>
                  Thank you, {name}. A Platinum AI solutions engineer will reach out to{' '}
                  <Text style={{ fontWeight: '700' }}>{email}</Text> within 2 business hours.
                </Text>
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                  }}
                >
                  <Text style={styles.resetBtnText}>Send another request</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.formHeading}>Book an Enterprise Demo</Text>
                <Text style={styles.formSub}>Get a live walkthrough with your sample documents.</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Sarah Connor"
                    placeholderTextColor="#94A3B8"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Work Email *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="name@company.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company / Organization</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Acme Corporation"
                    placeholderTextColor="#94A3B8"
                    value={company}
                    onChangeText={setCompany}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company Size</Text>
                  <View style={styles.sizeChipsRow}>
                    {['1-50', '51-200', '201-1000', '1000+'].map((sz) => (
                      <TouchableOpacity
                        key={sz}
                        style={[
                          styles.sizeChip,
                          selectedSize === sz && styles.sizeChipActive,
                        ]}
                        onPress={() => setSelectedSize(sz)}
                      >
                        <Text
                          style={[
                            styles.sizeChipText,
                            selectedSize === sz && styles.sizeChipTextActive,
                          ]}
                        >
                          {sz}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                  activeOpacity={0.88}
                >
                  <Text style={styles.submitBtnText}>Request Live Architecture Demo</Text>
                  <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <Text style={styles.formDisclaimer}>
                  🔒 No credit card required. SOC2-compliant NDA available.
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

function BenefitRow({ text }) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.checkCircle}>
        <Feather name="check" size={12} color="#0056FF" />
      </View>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    width: '100%',
    alignItems: 'center',
  },
  innerBox: {
    flexDirection: 'row',
    maxWidth: 1100,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 6,
    gap: 40,
  },
  innerBoxMobile: {
    flexDirection: 'column',
    padding: 24,
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightSide: {
    flex: 1.1,
  },
  fullWidth: {
    width: '100%',
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
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 15.5,
    color: '#64748B',
    lineHeight: 25,
    marginBottom: 26,
  },
  benefitsList: {
    gap: 14,
    marginBottom: 32,
    width: '100%',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 13.5,
    color: '#334155',
    lineHeight: 22,
    flex: 1,
    fontWeight: '500',
  },
  directContactRow: {
    gap: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    width: '100%',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactItemText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },

  /* Form Card */
  formCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 28,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  sizeChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeChip: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  sizeChipActive: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  sizeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  sizeChipTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0056FF',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  formDisclaimer: {
    fontSize: 11.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 14,
  },

  /* Success State */
  successState: {
    alignItems: 'center',
    paddingVertical: 30,
    textAlign: 'center',
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 10,
  },
  successDesc: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  resetBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
});
