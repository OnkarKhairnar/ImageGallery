import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, SPACING } from '../constants';

export default function SkeletonCard() {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
      <Animated.View
        style={[styles.image, { backgroundColor: colors.skeleton, opacity: pulse }]}
      />
      <View style={styles.info}>
        <Animated.View
          style={[styles.lineWide, { backgroundColor: colors.skeleton, opacity: pulse }]}
        />
        <Animated.View
          style={[styles.lineShort, { backgroundColor: colors.skeleton, opacity: pulse }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    flexBasis: '45%',
    margin: SPACING.sm,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  info: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  lineWide: {
    height: 10,
    width: '75%',
    borderRadius: RADIUS.sm,
  },
  lineShort: {
    height: 10,
    width: '40%',
    borderRadius: RADIUS.sm,
    marginTop: SPACING.sm,
  },
});
