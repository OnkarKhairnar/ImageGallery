import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES } from '../constants';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function PasswordInput({ label, error, ...props }: Props) {
  const { colors } = useTheme();
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.error : colors.inputBorder,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.inputText }]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secure}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setSecure(!secure)}
          style={styles.eyeButton}
          activeOpacity={0.6}
        >
          <Text style={[styles.eyeText, { color: colors.textSecondary }]}>
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
    marginBottom: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: SPACING.md,
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
