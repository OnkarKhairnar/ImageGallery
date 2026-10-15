import { RegisterFormData, EditProfileFormData } from '../types';

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  gender?: string;
  mobile?: string;
  address?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateFullName = (value: string): string | undefined => {
  if (!value.trim()) return 'Full name is required';
  if (value.trim().length < 2) return 'Full name must be at least 2 characters';
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return 'Enter a valid email address';
  return undefined;
};

export const validateGender = (value: string): string | undefined => {
  if (!value) return 'Gender is required';
  return undefined;
};

export const validateMobile = (value: string): string | undefined => {
  if (!value.trim()) return 'Mobile number is required';
  const numericRegex = /^\d+$/;
  if (!numericRegex.test(value.trim())) return 'Mobile number must contain digits only';
  if (value.trim().length !== 10) return 'Mobile number must be exactly 10 digits';
  return undefined;
};

export const validateAddress = (value: string): string | undefined => {
  if (!value.trim()) return 'Address is required';
  if (value.trim().length < 5) return 'Address must be at least 5 characters';
  return undefined;
};

export const validateCity = (value: string): string | undefined => {
  if (!value) return 'City is required';
  return undefined;
};

export const validatePassword = (value: string): string | undefined => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return undefined;
};

export const validateRegisterForm = (form: RegisterFormData): ValidationErrors => {
  return {
    fullName: validateFullName(form.fullName),
    email: validateEmail(form.email),
    gender: validateGender(form.gender),
    mobile: validateMobile(form.mobile),
    address: validateAddress(form.address),
    city: validateCity(form.city),
    password: validatePassword(form.password),
    confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
  };
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};

export interface EditProfileValidationErrors {
  fullName?: string;
  email?: string;
  gender?: string;
  mobile?: string;
  address?: string;
  city?: string;
}

export const validateEditProfile = (form: EditProfileFormData): EditProfileValidationErrors => {
  return {
    fullName: validateFullName(form.fullName),
    email: validateEmail(form.email),
    gender: validateGender(form.gender),
    mobile: validateMobile(form.mobile),
    address: validateAddress(form.address),
    city: validateCity(form.city),
  };
};

export const hasEditProfileErrors = (errors: EditProfileValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};
