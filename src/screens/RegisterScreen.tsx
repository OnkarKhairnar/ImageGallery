import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RegisterFormData } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateRegisterForm, hasErrors, ValidationErrors } from '../utils/validation';
import { SPACING, FONT_SIZES, CITIES, GENDER_OPTIONS } from '../constants';
import FormField from '../components/FormField';
import RadioGroup from '../components/RadioGroup';
import SelectInput from '../components/SelectInput';
import PasswordInput from '../components/PasswordInput';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    gender: '',
    mobile: '',
    address: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateRegisterForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const error = await register({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        gender: form.gender as 'Male' | 'Female' | 'Other',
        mobile: form.mobile.trim(),
        address: form.address.trim(),
        city: form.city,
        password: form.password,
      });
      if (error) {
        showToast(error, 'error');
        return;
      }
      showToast('Account created successfully!', 'success');
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Fill in the details to register
          </Text>
        </View>

        <FormField
          label="Full Name"
          placeholder="Enter your full name"
          value={form.fullName}
          onChangeText={(v) => updateField('fullName', v)}
          error={errors.fullName}
          autoCapitalize="words"
        />

        <FormField
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(v) => updateField('email', v)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <RadioGroup
          label="Gender"
          options={GENDER_OPTIONS}
          selectedValue={form.gender}
          onValueChange={(v) => updateField('gender', v)}
          error={errors.gender}
        />

        <FormField
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={form.mobile}
          onChangeText={(v) => updateField('mobile', v.replace(/[^0-9]/g, ''))}
          error={errors.mobile}
          keyboardType="numeric"
          maxLength={10}
        />

        <FormField
          label="Address"
          placeholder="Enter your address"
          value={form.address}
          onChangeText={(v) => updateField('address', v)}
          error={errors.address}
        />

        <SelectInput
          label="City"
          options={CITIES}
          value={form.city}
          onValueChange={(v) => updateField('city', v)}
          placeholder="Select your city"
          error={errors.city}
        />

        <PasswordInput
          label="Password"
          placeholder="Min 6 characters"
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChangeText={(v) => updateField('confirmPassword', v)}
          error={errors.confirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.card }]}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 40,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
  },
  button: {
    padding: SPACING.md + 2,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  buttonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  loginText: {
    fontSize: FONT_SIZES.md,
  },
});
