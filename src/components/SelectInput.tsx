import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES } from '../constants';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function SelectInput({ label, options, value, onValueChange, placeholder = 'Select an option', error }: Props) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.select,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.error : colors.inputBorder,
          },
        ]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectText,
            { color: selectedLabel ? colors.text : colors.placeholder },
          ]}
        >
          {selectedLabel || placeholder}
        </Text>
        <Text style={[styles.arrow, { color: colors.textSecondary }]}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={[styles.overlay, { backgroundColor: colors.modalOverlay }]}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.modal, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select City</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    {
                      backgroundColor: item.value === value ? colors.primary + '20' : 'transparent',
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      {
                        color: item.value === value ? colors.primary : colors.text,
                        fontWeight: item.value === value ? '600' : '400',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
  },
  selectText: {
    fontSize: FONT_SIZES.md,
  },
  arrow: {
    fontSize: FONT_SIZES.xs,
  },
  error: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modal: {
    width: '100%',
    maxHeight: '60%',
    borderRadius: 16,
    padding: SPACING.lg,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  modalOption: {
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
  },
  modalOptionText: {
    fontSize: FONT_SIZES.md,
  },
});
