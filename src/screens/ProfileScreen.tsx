import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TabScreenNavigationProp } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SPACING, FONT_SIZES, AVATARS } from '../constants';
import AvatarSelector from '../components/AvatarSelector';

type Props = {
  navigation: TabScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout, updateUser } = useAuth();
  const { showToast } = useToast();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
  };

  const handleAvatarSelect = async (avatarId: string) => {
    await updateUser({ avatar: avatarId });
    showToast('Avatar updated', 'success');
  };

  const handleToggleTheme = () => {
    toggleTheme();
    showToast(`Dark mode ${isDark ? 'off' : 'on'}`, 'info');
  };

  const getAvatarEmoji = () => {
    if (!user?.avatar) return '?';
    const found = AVATARS.find((a) => a.id === user.avatar);
    return found ? found.emoji : '?';
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value || '—'}</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TouchableOpacity onPress={() => setShowAvatarSelector(true)} activeOpacity={0.7}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{getAvatarEmoji()}</Text>
          </View>
          <Text style={[styles.changeAvatar, { color: colors.primary }]}>Change Avatar</Text>
        </TouchableOpacity>

        <Text style={[styles.name, { color: colors.text }]}>{user?.fullName || 'User'}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email || ''}</Text>
      </View>

      <View style={[styles.detailsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
        <InfoRow label="Full Name" value={user?.fullName || ''} />
        <InfoRow label="Email" value={user?.email || ''} />
        <InfoRow label="Mobile" value={user?.mobile || ''} />
        <InfoRow label="Gender" value={user?.gender || ''} />
        <InfoRow label="Address" value={user?.address || ''} />
        <InfoRow label="City" value={user?.city || ''} />
      </View>

      <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.menuText, { color: colors.text }]}>Edit Profile</Text>
          <Text style={[styles.menuArrow, { color: colors.textSecondary }]}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={handleToggleTheme}
          activeOpacity={0.7}
        >
          <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode</Text>
          <Text style={[styles.toggleText, { color: colors.primary }]}>
            {isDark ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: colors.error }]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>

      <AvatarSelector
        visible={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelect={handleAvatarSelect}
        currentAvatar={user?.avatar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  card: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
  },
  changeAvatar: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.md,
  },
  detailsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuText: {
    fontSize: FONT_SIZES.md,
  },
  menuArrow: {
    fontSize: FONT_SIZES.xl,
  },
  toggleText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  logoutButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: SPACING.md + 2,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
});
