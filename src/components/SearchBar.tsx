import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES, RADIUS, SHADOWS } from '../constants';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search by author...' }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        SHADOWS.sm,
        { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder },
      ]}
    >
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={[styles.input, { color: colors.inputText }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={10}
          style={[styles.clear, { backgroundColor: colors.border }]}
        >
          <Text style={[styles.clearText, { color: colors.textSecondary }]}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md - 2,
    fontSize: FONT_SIZES.md,
  },
  clear: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 11,
    fontWeight: '700',
  },
});