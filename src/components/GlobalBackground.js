import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { BACKGROUND_TEMPLATES, templateManager } from '../services/BackgroundTemplateManager';

export default function GlobalBackground({ scrollY, activeSection = 'home' }) {
  // Store current and incoming template for crossfade
  const [currentTemplate, setCurrentTemplate] = useState(BACKGROUND_TEMPLATES[0]);
  const [incomingTemplate, setIncomingTemplate] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition animation values
  const transitionAnim = useRef(new Animated.Value(1)).current;
  const currentSectionRef = useRef('home');
  const lastScrollYRef = useRef(0);

  // Parallax subtle scale & translation
  const scrollParallax = useRef(new Animated.Value(0)).current;

  // React to section changes
  useEffect(() => {
    if (activeSection === currentSectionRef.current && incomingTemplate === null) {
      return;
    }

    const nextTpl = templateManager.getTemplateForSection(activeSection);
    if (nextTpl.id === currentTemplate.id) {
      return;
    }

    currentSectionRef.current = activeSection;
    setIncomingTemplate(nextTpl);
    setIsTransitioning(true);

    // Reset transition value
    transitionAnim.setValue(0);

    // Animate crossfade + scale (750ms cinematic ease)
    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: 750,
      useNativeDriver: false,
    }).start(() => {
      setCurrentTemplate(nextTpl);
      setIncomingTemplate(null);
      setIsTransitioning(false);
      transitionAnim.setValue(1);
    });
  }, [activeSection]);

  // General scroll detection on Web using IntersectionObserver or scroll thresholds
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ['home', 'how-it-works', 'organizations', 'security', 'testimonials', 'contact'];

    // IntersectionObserver for clean section detection
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              const secId = entry.target.id || entry.target.getAttribute('nativeid');
              if (secId && secId !== currentSectionRef.current) {
                const nextTpl = templateManager.getTemplateForSection(secId);
                if (nextTpl.id !== currentTemplate.id) {
                  triggerTransition(nextTpl, secId);
                }
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0.35, 0.6],
        }
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      // Fallback scroll threshold listener (ensures continuous evolution throughout long sections)
      let scrollTimer = null;
      const onScroll = () => {
        const currentY = window.scrollY || window.pageYOffset || 0;
        const delta = currentY - lastScrollYRef.current;
        lastScrollYRef.current = currentY;

        // Micro-parallax
        scrollParallax.setValue(Math.min(Math.max(currentY * 0.05, 0), 100));

        // Threshold check every 120ms
        if (!scrollTimer) {
          scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const viewportH = window.innerHeight || 800;
            const thresholdIndex = Math.floor(currentY / (viewportH * 0.9));
            const pseudoSecKey = `threshold-${thresholdIndex}`;

            if (pseudoSecKey !== currentSectionRef.current) {
              const nextTpl = templateManager.getTemplateForSection(pseudoSecKey);
              if (nextTpl.id !== currentTemplate.id) {
                triggerTransition(nextTpl, pseudoSecKey);
              }
            }
          }, 120);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        if (scrollTimer) clearTimeout(scrollTimer);
      };
    }
  }, [currentTemplate]);

  const triggerTransition = (nextTpl, secKey) => {
    currentSectionRef.current = secKey;
    setIncomingTemplate(nextTpl);
    setIsTransitioning(true);

    transitionAnim.setValue(0);
    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: 750,
      useNativeDriver: false,
    }).start(() => {
      setCurrentTemplate(nextTpl);
      setIncomingTemplate(null);
      setIsTransitioning(false);
      transitionAnim.setValue(1);
    });
  };

  // Interpolate opacity and scale
  const incomingOpacity = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const incomingScale = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1.06, 1.0],
  });

  const currentOpacity = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* 1. Base / Current Template Layer */}
      <Animated.Image
        source={currentTemplate.source}
        style={[
          styles.templateImage,
          {
            opacity: incomingTemplate ? currentOpacity : 1,
            transform: [{ scale: 1.0 }],
          },
        ]}
        resizeMode="cover"
      />

      {/* 2. Incoming Crossfade Template Layer */}
      {incomingTemplate && (
        <Animated.Image
          source={incomingTemplate.source}
          style={[
            styles.templateImage,
            {
              opacity: incomingOpacity,
              transform: [{ scale: incomingScale }],
            },
          ]}
          resizeMode="cover"
        />
      )}

      {/* 3. Subtle Ambient Tint & Readability Overlay */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: incomingTemplate
              ? incomingTemplate.tint
              : currentTemplate.tint,
          },
        ]}
      />

      {/* 4. Soft Top & Bottom Vignette for Cinematic Lighting */}
      <View style={styles.vignetteOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        position: 'fixed',
      },
      default: {
        position: 'absolute',
      },
    }),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: '#FAFCFF',
  },
  templateImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  vignetteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Subtle gradient vignette to give depth
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
