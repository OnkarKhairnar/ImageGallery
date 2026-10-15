import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES, RADIUS } from '../constants';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormField({ label, error, onFocus, onBlur, ...props }: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.error : focused ? colors.primary : colors.inputBorder;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor,
            borderWidth: focused ? 1.5 : 1,
          },
        ]}
        placeholderTextColor={colors.placeholder}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs + 2,
  },
  input: {
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md - 2,
    fontSize: FONT_SIZES.md,
  },
  error: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
});