import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FilterOption } from '../types';
import { SPACING, FONT_SIZES } from '../constants';

interface Props {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
}

const FILTERS: FilterOption[] = ['All', 'A-M', 'N-Z'];

export default function FilterBar({ selected, onSelect }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = selected === filter;
        return (
          <TouchableOpacity
            key={filter}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.primary : colors.card,
                borderColor: isActive ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onSelect(filter)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                { color: isActive ? colors.card : colors.text },
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
