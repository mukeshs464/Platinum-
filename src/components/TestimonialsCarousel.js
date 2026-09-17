import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const TESTIMONIALS = [
  {
    id: 1,
    company: 'TechNova Global',
    industry: 'Enterprise Software (4,500+ Employees)',
    logoIcon: 'domain',
    quote:
      'Platinum AI completely transformed our internal support operations. Our HR team used to answer hundreds of repetitive queries daily regarding PTO, maternity leave, and healthcare plans. Within 3 weeks of rolling out Platinum, ticket volume dropped by 86%, and employees get verified citations instantly.',
    author: 'Elena Vance',
    role: 'VP of Global People Operations',
    metric: '86% Fewer HR Tickets',
    submetric: 'Instant response across 4 global offices',
    badgeColor: '#0056FF',
    bgColor: '#EFF6FF',
  },
  {
    id: 2,
    company: 'FinEdge Capital Partners',
    industry: 'Investment Banking & Asset Management',
    logoIcon: 'bank-outline',
    quote:
      'In asset management and corporate finance, zero-trust security is non-negotiable. Platinum’s cryptographic vector isolation and private VPC deployment satisfied our most rigorous SEC and FINRA audit standards. Our legal team now verifies compliance policies in seconds instead of hours.',
    author: 'Marcus Sterling',
    role: 'Chief Compliance & Security Officer',
    metric: '100% Audit Compliance',
    submetric: 'Zero third-party LLM data retention',
    badgeColor: '#10B981',
    bgColor: '#ECFDF5',
  },
  {
    id: 3,
    company: 'MedCore Health Systems',
    industry: 'Healthcare Services (12,000+ Clinicians)',
    logoIcon: 'hospital-building',
    quote:
      'Our medical staff need accurate, immediate answers to clinical protocols and shift scheduling without wading through 400-page policy manuals. Platinum AI provides sub-second answers backed by exact document citations, all under strict HIPAA and BAA compliance.',
    author: 'Dr. Sarah Chen, MD',
    role: 'Head of Clinical IT & Operations',
    metric: '< 1s Latency on Protocols',
    submetric: 'HIPAA & SOC 2 Type II certified',
    badgeColor: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  {
    id: 4,
    company: 'Apex Logistics & Freight',
    industry: 'Global Supply Chain & Freight (28 Countries)',
    logoIcon: 'truck-fast-outline',
    quote:
      'Operating across 28 countries means managing dozens of regional customs, warehousing, and safety SOPs. With Platinum AI, warehouse managers and logistics coordinators get localized compliance guidelines in their preferred language instantly.',
    author: 'Rajesh Patel',
    role: 'Global Director of Supply Chain SOPs',
    metric: '10x Faster SOP Onboarding',
    submetric: 'Multi-lingual query comprehension',
    badgeColor: '#0284C7',
    bgColor: '#F0F9FF',
  },
];

export default function TestimonialsCarousel() {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.taglineBadge}>
          <Feather name="award" size={14} color="#0056FF" style={{ marginRight: 6 }} />
          <Text style={styles.tagline}>CUSTOMER SUCCESS & STORIES</Text>
        </View>
        <Text style={styles.title}>Trusted by High-Growth Enterprises</Text>
        <Text style={styles.subtitle}>
          Discover how organizations worldwide utilize Platinum AI to unlock their institutional knowledge
          with absolute security and citation accuracy.
        </Text>
      </View>

      {/* Main Carousel Container */}
      <View style={[styles.carouselCard, isMobile && styles.carouselCardMobile]}>
        {/* Carousel Header Bar: Counter & Quick Controls */}
        <View style={styles.carouselControlsRow}>
          <View style={[styles.badge, { backgroundColor: current.bgColor }]}>
            <MaterialCommunityIcons name={current.logoIcon} size={16} color={current.badgeColor} />
            <Text style={[styles.badgeText, { color: current.badgeColor }]}>{current.company}</Text>
          </View>

          <View style={styles.counterRow}>
            <Text style={styles.counterText}>
              <Text style={{ fontWeight: '800', color: '#0F172A' }}>{currentIndex + 1}</Text> / {TESTIMONIALS.length}
            </Text>

            {/* Arrows */}
            <View style={styles.arrowButtonGroup}>
              <TouchableOpacity
                style={styles.arrowBtn}
                onPress={handlePrev}
                activeOpacity={0.75}
                accessibilityLabel="Previous Story"
              >
                <Feather name="arrow-left" size={18} color="#0F172A" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.arrowBtn, styles.arrowBtnPrimary]}
                onPress={handleNext}
                activeOpacity={0.75}
                accessibilityLabel="Next Story"
              >
                <Feather name="arrow-right" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Industry Pill */}
        <Text style={styles.industryText}>{current.industry}</Text>

        {/* Big Quote */}
        <View style={styles.quoteWrapper}>
          <Text style={styles.quoteMark}>“</Text>
          <Text style={styles.quoteText}>{current.quote}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer: Author Info & Metric Stat */}
        <View style={[styles.cardFooter, isMobile && styles.cardFooterMobile]}>
          <View style={styles.authorRow}>
            <View style={[styles.avatarCircle, { backgroundColor: current.badgeColor }]}>
              <Text style={styles.avatarInitial}>{current.author.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.authorName}>{current.author}</Text>
              <Text style={styles.authorRole}>{current.role}</Text>
            </View>
          </View>

          <View style={[styles.metricBox, { backgroundColor: current.bgColor, borderColor: current.badgeColor + '30' }]}>
            <Text style={[styles.metricTitle, { color: current.badgeColor }]}>{current.metric}</Text>
            <Text style={styles.metricSub}>{current.submetric}</Text>
          </View>
        </View>

        {/* Carousel Pagination Dots */}
        <View style={styles.dotsRow}>
          {TESTIMONIALS.map((t, index) => {
            const isActive = index === currentIndex;
            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => setCurrentIndex(index)}
                style={[
                  styles.dot,
                  isActive && [styles.dotActive, { backgroundColor: current.badgeColor }],
                ]}
                activeOpacity={0.8}
              />
            );
          })}
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
    marginBottom: 44,
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

  /* Carousel Card */
  carouselCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 36,
    maxWidth: 1100,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 6,
  },
  carouselCardMobile: {
    padding: 20,
  },
  carouselControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  arrowButtonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
  },
  arrowBtnPrimary: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  industryText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 20,
  },
  quoteWrapper: {
    position: 'relative',
    marginBottom: 28,
  },
  quoteMark: {
    fontSize: 54,
    lineHeight: 40,
    color: '#CBD5E1',
    fontWeight: '800',
    marginBottom: -10,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1E293B',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: '100%',
    marginBottom: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardFooterMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  authorRole: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  metricBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  metricTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  metricSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    cursor: 'pointer',
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
  },
});
