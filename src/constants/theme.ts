import { Dimensions } from 'react-native';

export const COLORS = {
  light: {
    primary: '#6366F1',
    primarySoft: '#EEF2FF',
    onPrimary: '#FFFFFF',
    background: '#F7F7FB',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E8EAF2',
    skeleton: '#E8EAF2',
    error: '#EF4444',
    success: '#10B981',
    placeholder: '#94A3B8',
    inputBackground: '#FFFFFF',
    inputBorder: '#E2E8F0',
    inputText: '#0F172A',
    navBackground: '#F7F7FB',
    navBorder: '#E8EAF2',
    navText: '#64748B',
    navActiveText: '#6366F1',
    tabBackground: '#FFFFFF',
    tabBorder: 'transparent',
    tabActive: '#6366F1',
    tabInactive: '#94A3B8',
    modalOverlay: 'rgba(15,23,42,0.5)',
    buttonDisabled: '#CBD5E1',
    switchTrack: '#E2E8F0',
    switchThumb: '#FFFFFF',
  },
  dark: {
    primary: '#818CF8',
    primarySoft: '#25264A',
    onPrimary: '#0B0B14',
    background: '#0B0B14',
    card: '#161625',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#26263A',
    skeleton: '#26263A',
    error: '#F87171',
    success: '#34D399',
    placeholder: '#64748B',
    inputBackground: '#161625',
    inputBorder: '#2A2A40',
    inputText: '#F1F5F9',
    navBackground: '#0B0B14',
    navBorder: '#26263A',
    navText: '#94A3B8',
    navActiveText: '#818CF8',
    tabBackground: '#161625',
    tabBorder: 'transparent',
    tabActive: '#818CF8',
    tabInactive: '#64748B',
    modalOverlay: 'rgba(0,0,0,0.7)',
    buttonDisabled: '#3A3A52',
    switchTrack: '#2A2A40',
    switchThumb: '#FFFFFF',
  },
};

export type ThemeColors = typeof COLORS.light;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const RADIUS = { sm: 10, md: 14, lg: 20, xl: 28, full: 999 };

export const SHADOWS = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
};

export const CITIES = [
  { label: 'Pune', value: 'Pune' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Nashik', value: 'Nashik' },
  { label: 'Thane', value: 'Thane' },
  { label: 'Kolhapur', value: 'Kolhapur' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Hydrabad', value: 'Hydrabad' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Goa', value: 'Goa' },
  { label: 'Punjab', value: 'Punjab' },
  { label: 'Surat', value: 'Surat' },
  { label: 'Benglore', value: 'Benglore' },
];

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

export const AVATARS = [
  { id: 'av1', emoji: '👤', label: 'Default' },
  { id: 'av2', emoji: '😎', label: 'Cool' },
  { id: 'av3', emoji: '🎨', label: 'Artist' },
  { id: 'av4', emoji: '🚀', label: 'Rocket' },
  { id: 'av5', emoji: '🌟', label: 'Star' },
  { id: 'av6', emoji: '🎭', label: 'Mask' },
  { id: 'av7', emoji: '🦊', label: 'Fox' },
  { id: 'av8', emoji: '🐱', label: 'Cat' },
  { id: 'av9', emoji: '🦁', label: 'Lion' },
  { id: 'av10', emoji: '🐼', label: 'Panda' },
  { id: 'av11', emoji: '🦄', label: 'Unicorn' },
  { id: 'av12', emoji: '🐸', label: 'Frog' },
];

export const GALLERY_COLUMNS = 2;
export const SCREEN_WIDTH = Dimensions.get('window').width;