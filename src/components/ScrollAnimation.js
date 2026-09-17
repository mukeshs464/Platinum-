import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions, Platform } from 'react-native';

const frames = [
  require('../../images/Empty_office_interior_shown_20260916092803.jpeg'),
  require('../../images/Camera_pans_across_office_desk_20260916092807.jpeg'),
  require('../../images/Panning_office_background_20260916092814.jpeg'),
  require('../../images/Camera_panning_office_interior_20260916092818.jpeg')
];

export default function ScrollAnimation({ scrollY, scrollDistance }) {
  const { height: windowHeight } = Dimensions.get('window');
  const [totalScrollable, setTotalScrollable] = useState(scrollDistance || 3200);

  // In Web, dynamically calculate full page scroll height so the animation flows across the whole website
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const computeMaxScroll = () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        3000
      );
      const clientHeight = window.innerHeight || windowHeight || 800;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1500);
      setTotalScrollable(maxScroll);
    };

    computeMaxScroll();

    const onScroll = () => {
      const currentY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      scrollY.setValue(currentY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', computeMaxScroll);
    // Recompute after brief delay to account for all dynamic component rendering
    const timer = setTimeout(computeMaxScroll, 500);

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', computeMaxScroll);
      clearTimeout(timer);
    };
  }, [scrollY, windowHeight]);

  const effectiveDistance = scrollDistance || totalScrollable;
  const numTransitions = Math.max(frames.length - 1, 1);
  const step = effectiveDistance / numTransitions;

  return (
    <View style={styles.fixedBackground} pointerEvents="none">
      {frames.map((frame, index) => {
        const center = index * step;

        let opacity;
        if (index === 0) {
          // Frame 0: visible initially, smoothly crossfades out towards step
          opacity = scrollY.interpolate({
            inputRange: [-1000, 0, step * 0.9],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          });
        } else if (index === frames.length - 1) {
          // Last Frame: fades in as we approach the bottom and stays visible
          opacity = scrollY.interpolate({
            inputRange: [center - step * 0.9, center, center + 20000],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
          });
        } else {
          // Intermediate Frames: smooth crossfade
          opacity = scrollY.interpolate({
            inputRange: [center - step * 0.9, center, center + step * 0.9],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
        }

        // Subtle parallax scale effect
        const scale = scrollY.interpolate({
          inputRange: [Math.max(0, center - step), center, center + step],
          outputRange: [1.05, 1, 1.04],
          extrapolate: 'clamp',
        });

        return (
          <Animated.Image
            key={index}
            source={frame}
            style={[styles.frame, { opacity, transform: [{ scale }] }]}
            resizeMode="cover"
          />
        );
      })}

      {/* Translucent glass overlay so dark text across all sections is always crisp and readable */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixedBackground: {
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
    height: '100vh',
    width: '100vw',
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: '#FAFCFF',
  },
  frame: {
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
    // Transparent light tint allowing 75% vivid background visibility while keeping enterprise text crisp
    backgroundColor: 'rgba(250, 252, 255, 0.25)',
  },
});
