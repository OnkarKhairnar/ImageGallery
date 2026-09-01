import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, EditProfileFormData } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  validateEditProfile,
  hasEditProfileErrors,
  EditProfileValidationErrors,
} from "../utils/validation";
import { SPACING, FONT_SIZES, CITIES, GENDER_OPTIONS } from "../constants";
import FormField from "../components/FormField";
import RadioGroup from "../components/RadioGroup";
import SelectInput from "../components/SelectInput";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "EditProfile">;
};

export default function EditProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState<EditProfileFormData>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    gender: user?.gender || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
  });

  const [errors, setErrors] = useState<EditProfileValidationErrors>({});

  const updateField = (field: keyof EditProfileFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof EditProfileValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    const validationErrors = validateEditProfile(form);
    if (hasEditProfileErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      await updateUser({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        gender: form.gender as "Male" | "Female" | "Other",
        mobile: form.mobile.trim(),
        address: form.address.trim(),
        city: form.city,
      });
      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Full Name"
          placeholder="Enter your full name"
          value={form.fullName}
          onChangeText={(v) => updateField("fullName", v)}
          error={errors.fullName}
          autoCapitalize="words"
        />

        <FormField
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(v) => updateField("email", v)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <RadioGroup
          label="Gender"
          options={GENDER_OPTIONS}
          selectedValue={form.gender}
          onValueChange={(v) => updateField("gender", v)}
          error={errors.gender}
        />

        <FormField
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={form.mobile}
          onChangeText={(v) => updateField("mobile", v.replace(/[^0-9]/g, ""))}
          error={errors.mobile}
          keyboardType="numeric"
          maxLength={10}
        />

        <FormField
          label="Address"
          placeholder="Enter your address"
          value={form.address}
          onChangeText={(v) => updateField("address", v)}
          error={errors.address}
        />

        <SelectInput
          label="City"
          options={CITIES}
          value={form.city}
          onValueChange={(v) => updateField("city", v)}
          placeholder="Select your city"
          error={errors.city}
        />

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <Text style={[styles.saveButtonText, { color: colors.card }]}>
              Save Changes
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.cancelText, { color: colors.textSecondary }]}>
            Cancel
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
    paddingBottom: SPACING.xl * 2,
  },
  saveButton: {
    padding: SPACING.md + 2,
    borderRadius: 12,
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  cancelLink: {
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  cancelText: {
    fontSize: FONT_SIZES.md,
  },
});
