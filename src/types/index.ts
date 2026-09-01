export interface User {
  id: string;
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  address: string;
  city: string;
  password: string;
  avatar?: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  mobile: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface EditProfileFormData {
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  mobile: string;
  address: string;
  city: string;
}

export interface ImageItem {
  id: string;
  url: string;
  author: string;
  width: number;
  height: number;
}

export type FilterOption = 'All' | 'A-M' | 'N-Z';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  ImageDetails: { image: ImageItem };
  EditProfile: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

export type TabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
