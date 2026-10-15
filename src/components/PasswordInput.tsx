import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES, RADIUS } from '../constants';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function PasswordInput({ label, error, onFocus, onBlur, ...props }: Props) {
  const { colors } = useTheme();
  const [secure, setSecure] = useState(true);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.error : focused ? colors.primary : colors.inputBorder;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
            borderColor,
            borderWidth: focused ? 1.5 : 1,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.inputText }]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secure}
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
        <TouchableOpacity
          onPress={() => setSecure(!secure)}
          style={styles.eyeButton}
          activeOpacity={0.6}
        >
          <Text style={[styles.eyeText, { color: colors.primary }]}>
            {secure ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
      </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md - 2,
    fontSize: FONT_SIZES.md,
  },
  eyeButton: {
    paddingHorizontal: SPACING.md,
  },
  eyeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  error: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
});