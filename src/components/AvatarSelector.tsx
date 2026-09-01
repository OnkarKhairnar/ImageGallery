import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AVATARS, SPACING, FONT_SIZES } from '../constants';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (avatarId: string) => void;
  currentAvatar?: string;
}

export default function AvatarSelector({ visible, onClose, onSelect, currentAvatar }: Props) {
  const { colors } = useTheme();

  const handleSelect = (avatarId: string) => {
    onSelect(avatarId);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: colors.modalOverlay }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Choose Avatar</Text>
          <View style={styles.grid}>
            {AVATARS.map((avatar) => {
              const isSelected = currentAvatar === avatar.id;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarOption,
                    {
                      backgroundColor: isSelected ? colors.primary + '20' : colors.background,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => handleSelect(avatar.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.emoji}>{avatar.emoji}</Text>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>{avatar.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.background }]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={[styles.closeText, { color: colors.text }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  container: {
    width: '100%',
    borderRadius: 20,
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  avatarOption: {
    width: 72,
    height: 88,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  emoji: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.xs,
  },
  closeButton: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
