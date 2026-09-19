import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const DEPARTMENTS = [
  {
    id: 'hr',
    title: 'Human Resources',
    icon: 'account-group-outline',
    color: '#0056FF',
    sampleQuestions: [
      'What is the parental leave duration and application process?',
      'How does health insurance dependent coverage work?',
      'Where can I find the 2026 official holiday calendar?',
    ],
    sampleAnswer: {
      question: 'What is the parental leave duration and application process?',
      answer: 'Full-time employees are eligible for up to 16 weeks of fully-paid parental leave after 6 months of tenure. Applications must be submitted via the HR Portal 30 days prior to commencement.',
      source: 'Global Employee Handbook • Section 5.3',
    },
  },
  {
    id: 'it',
    title: 'IT & Security',
    icon: 'shield-lock-outline',
    color: '#7C3AED',
    sampleQuestions: [
      'How do I set up hardware 2FA for remote VPN access?',
      'What is the policy on company laptop replacement?',
      'How do I report a suspected phishing email?',
    ],
    sampleAnswer: {
      question: 'How do I set up hardware 2FA for remote VPN access?',
      answer: 'Install the Platinum Authenticator app, navigate to Security Settings in your Okta SSO dashboard, and scan the one-time registration QR code. Physical YubiKeys can be ordered from the IT portal.',
      source: 'IT Security Architecture Standard v4.2',
    },
  },
  {
    id: 'finance',
    title: 'Finance & Legal',
    icon: 'finance',
    color: '#10B981',
    sampleQuestions: [
      'What is the per-diem limit for international business travel?',
      'How do I submit vendor invoices for tax deduction?',
      'What is the approval matrix for software SaaS subscriptions?',
    ],
    sampleAnswer: {
      question: 'What is the per-diem limit for international business travel?',
      answer: 'Tier-1 cities have an approved daily lodging allowance of $280 and meal per-diem of $90. Any excess requires pre-approval from your VP or Division Controller.',
      source: 'Corporate Travel & Expense Directive 2026',
    },
  },
  {
    id: 'ops',
    title: 'Operations & Support',
    icon: 'cog-outline',
    color: '#0284C7',
    sampleQuestions: [
      'What are our standard client incident response SLAs?',
      'Where is the backup disaster recovery runbook stored?',
      'How do we handle multi-region failover tests?',
    ],
    sampleAnswer: {
      question: 'What are our standard client incident response SLAs?',
      answer: 'P1 (Critical) incidents require initial engineer acknowledgment within 15 minutes and hourly executive status updates until mitigation.',
      source: 'Operational Excellence & SLA Framework',
    },
  },
];

export default function ForOrganizations({ onNavigateContact }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;
  const [activeDeptId, setActiveDeptId] = useState('hr');

  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];
  const currentDeptIndex = DEPARTMENTS.findIndex((d) => d.id === activeDeptId);

  const handlePrevDept = () => {
    const nextIdx = currentDeptIndex > 0 ? currentDeptIndex - 1 : DEPARTMENTS.length - 1;
    setActiveDeptId(DEPARTMENTS[nextIdx].id);
  };

  const handleNextDept = () => {
    const nextIdx = currentDeptIndex < DEPARTMENTS.length - 1 ? currentDeptIndex + 1 : 0;
    setActiveDeptId(DEPARTMENTS[nextIdx].id);
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.taglineBadge}>
          <MaterialCommunityIcons name="domain" size={14} color="#0056FF" style={{ marginRight: 6 }} />
          <Text style={styles.tagline}>FOR ORGANIZATIONS</Text>
        </View>
        <Text style={styles.title}>Unified Enterprise Intelligence Across Every Team</Text>
        <Text style={styles.subtitle}>
          Stop employees from losing hours searching through fragmented Slack channels, SharePoint folders,
          and buried PDFs. Platinum AI connects directly to every departmental silo securely.
        </Text>
      </View>

      {/* Metrics Row */}
      <View style={[styles.metricsRow, isMobile && styles.metricsRowMobile]}>
        <MetricCard number="84%" label="Reduction in repetitive tickets" sub="HR & IT queries resolved instantly" />
        <MetricCard number="10x" label="Faster employee onboarding" sub="New hires find policies without help" />
        <MetricCard number="100%" label="Isolated tenant privacy" sub="Zero leakage across departments" />
        <MetricCard number="< 1s" label="Average answer latency" sub="Direct citations on every response" />
      </View>

      {/* Department Tabs & Interactive Live Query Card */}
      <View style={[styles.deptShowcase, isMobile && styles.deptShowcaseMobile]}>
        {/* Left: Department List */}
        <View style={[styles.deptLeft, isMobile && styles.fullWidth]}>
          <Text style={styles.deptListHeading}>Select a Department Workspace:</Text>

          <View style={styles.deptList}>
            {DEPARTMENTS.map((dept) => {
              const isSelected = dept.id === activeDeptId;
              return (
                <TouchableOpacity
                  key={dept.id}
                  style={[
                    styles.deptBtn,
                    isSelected && styles.deptBtnActive,
                    isSelected && { borderLeftColor: dept.color },
                  ]}
                  onPress={() => setActiveDeptId(dept.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.deptIconCircle, { backgroundColor: isSelected ? dept.color : '#F1F5F9' }]}>
                    <MaterialCommunityIcons
                      name={dept.icon}
                      size={20}
                      color={isSelected ? '#FFFFFF' : '#64748B'}
                    />
                  </View>
                  <View style={styles.deptBtnInfo}>
                    <Text style={[styles.deptBtnTitle, isSelected && { color: dept.color }]}>
                      {dept.title}
                    </Text>
                    <Text style={styles.deptBtnSubtitle}>
                      {dept.sampleQuestions.length} sample policies indexed
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={18}
                    color={isSelected ? dept.color : '#CBD5E1'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Right: Live Interactive Query Preview */}
        <View style={[styles.deptRight, isMobile && styles.fullWidth]}>
          <View style={styles.previewCard}>
            <View style={styles.previewCardHeader}>
              <View style={[styles.deptTag, { backgroundColor: activeDept.color + '15' }]}>
                <Text style={[styles.deptTagText, { color: activeDept.color }]}>
                  {activeDept.title} Knowledge Base
                </Text>
              </View>
              <View style={styles.encryptedPill}>
                <Feather name="lock" size={12} color="#059669" />
                <Text style={styles.encryptedPillText}>Role-Restricted</Text>
              </View>
            </View>

            <Text style={styles.questionsLabel}>Frequently Asked By Employees:</Text>
            <View style={styles.sampleQuestionsList}>
              {activeDept.sampleQuestions.map((q, idx) => (
                <View key={idx} style={styles.sampleQuestionPill}>
                  <Feather name="help-circle" size={14} color="#64748B" style={{ marginRight: 6 }} />
                  <Text style={styles.sampleQuestionText}>{q}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            {/* Answer Box */}
            <View style={styles.liveAnswerBox}>
              <View style={styles.answerHeaderRow}>
                <View style={[styles.botAvatarSmall, { backgroundColor: activeDept.color }]}>
                  <MaterialCommunityIcons name="robot" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.answerHeaderTitle}>Platinum AI Verified Response</Text>
              </View>

              <Text style={styles.answerBodyText}>{activeDept.sampleAnswer.answer}</Text>

              <View style={styles.sourceTag}>
                <Feather name="check-circle" size={13} color="#059669" style={{ marginRight: 6 }} />
                <Text style={styles.sourceTagText}>{activeDept.sampleAnswer.source}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.testPromptBtn, { backgroundColor: activeDept.color }]}
              onPress={onNavigateContact}
              activeOpacity={0.85}
            >
              <Text style={styles.testPromptBtnText}>Schedule a Department Pilot</Text>
              <Feather name="arrow-up-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            {/* Department Carousel Navigation Footer */}
            <View style={styles.deptCarouselControls}>
              <TouchableOpacity
                style={styles.deptCarouselBtn}
                onPress={handlePrevDept}
                activeOpacity={0.8}
                accessibilityLabel="Previous Department"
              >
                <Feather name="chevron-left" size={16} color="#0F172A" />
                <Text style={styles.deptCarouselBtnText}>Previous Dept</Text>
              </TouchableOpacity>

              <View style={styles.deptDotsRow}>
                {DEPARTMENTS.map((d, idx) => (
                  <TouchableOpacity
                    key={d.id}
                    onPress={() => setActiveDeptId(d.id)}
                    style={[
                      styles.deptDot,
                      idx === currentDeptIndex && [styles.deptDotActive, { backgroundColor: activeDept.color }],
                    ]}
                    activeOpacity={0.8}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.deptCarouselBtn, styles.deptCarouselBtnNext, { backgroundColor: activeDept.color }]}
                onPress={handleNextDept}
                activeOpacity={0.85}
                accessibilityLabel="Next Department"
              >
                <Text style={styles.deptCarouselBtnNextText}>Next Dept</Text>
                <Feather name="chevron-right" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function MetricCard({ number, label, sub }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricNumber}>{number}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricSub}>{sub}</Text>
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
    marginBottom: 44,
    maxWidth: 820,
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

  /* Metrics */
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1100,
    marginBottom: 50,
    gap: 16,
  },
  metricsRowMobile: {
    flexDirection: 'column',
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  metricNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0056FF',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  /* Dept Showcase */
  deptShowcase: {
    flexDirection: 'row',
    maxWidth: 1100,
    width: '100%',
    gap: 32,
    alignItems: 'flex-start',
  },
  deptShowcaseMobile: {
    flexDirection: 'column',
  },
  deptLeft: {
    flex: 1,
  },
  deptRight: {
    flex: 1.2,
  },
  fullWidth: {
    width: '100%',
  },
  deptListHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 16,
  },
  deptList: {
    gap: 12,
  },
  deptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  deptBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  deptIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  deptBtnInfo: {
    flex: 1,
  },
  deptBtnTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  deptBtnSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },

  /* Preview Card */
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 6,
  },
  previewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deptTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  deptTagText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  encryptedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  encryptedPillText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  questionsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 10,
  },
  sampleQuestionsList: {
    gap: 8,
    marginBottom: 16,
  },
  sampleQuestionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sampleQuestionText: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  liveAnswerBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 18,
  },
  answerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  botAvatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerHeaderTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  answerBodyText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 10,
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignSelf: 'flex-start',
  },
  sourceTagText: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
  },
  testPromptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  testPromptBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  deptCarouselControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexWrap: 'wrap',
    gap: 8,
  },
  deptCarouselBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
    gap: 4,
  },
  deptCarouselBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  deptDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deptDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    cursor: 'pointer',
  },
  deptDotActive: {
    width: 20,
    borderRadius: 4,
  },
  deptCarouselBtnNext: {
    borderWidth: 0,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  deptCarouselBtnNextText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
