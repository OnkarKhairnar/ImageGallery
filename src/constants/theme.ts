import { Dimensions } from 'react-native';

export const COLORS = {
  light: {
    primary: '#6C63FF',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#1A1A2E',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#FF6B6B',
    success: '#4ECDC4',
    placeholder: '#999999',
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    inputText: '#1A1A2E',
    navBackground: '#FFFFFF',
    navBorder: '#E0E0E0',
    navText: '#666666',
    navActiveText: '#6C63FF',
    tabBackground: '#FFFFFF',
    tabBorder: '#E0E0E0',
    tabActive: '#6C63FF',
    tabInactive: '#666666',
    modalOverlay: 'rgba(0,0,0,0.5)',
    buttonDisabled: '#B0B0B0',
    switchTrack: '#E0E0E0',
    switchThumb: '#FFFFFF',
  },
  dark: {
    primary: '#6C63FF',
    background: '#1A1A2E',
    card: '#2D2D44',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#3D3D5C',
    error: '#FF6B6B',
    success: '#4ECDC4',
    placeholder: '#808080',
    inputBackground: '#2D2D44',
    inputBorder: '#3D3D5C',
    inputText: '#FFFFFF',
    navBackground: '#2D2D44',
    navBorder: '#3D3D5C',
    navText: '#B0B0B0',
    navActiveText: '#6C63FF',
    tabBackground: '#2D2D44',
    tabBorder: '#3D3D5C',
    tabActive: '#6C63FF',
    tabInactive: '#B0B0B0',
    modalOverlay: 'rgba(0,0,0,0.7)',
    buttonDisabled: '#666666',
    switchTrack: '#3D3D5C',
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

export const CITIES = [
  { label: 'New York', value: 'New York' },
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'Chicago', value: 'Chicago' },
  { label: 'Houston', value: 'Houston' },
  { label: 'Phoenix', value: 'Phoenix' },
  { label: 'San Antonio', value: 'San Antonio' },
  { label: 'San Diego', value: 'San Diego' },
  { label: 'Dallas', value: 'Dallas' },
  { label: 'Austin', value: 'Austin' },
  { label: 'Seattle', value: 'Seattle' },
  { label: 'Denver', value: 'Denver' },
  { label: 'Boston', value: 'Boston' },
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

export const API_URL = 'https://loremflickr.com';
export const GALLERY_COLUMNS = 2;
export const SCREEN_WIDTH = Dimensions.get('window').width;
