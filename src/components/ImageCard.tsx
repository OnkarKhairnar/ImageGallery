import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { ImageItem } from '../types';
import { SPACING, FONT_SIZES } from '../constants';

interface Props {
  image: ImageItem;
  onPress: () => void;
}

export default function ImageCard({ image, onPress }: Props) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(image.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.author, { color: colors.text }]} numberOfLines={1}>
          {image.author}
        </Text>
        <Text style={[styles.id, { color: colors.textSecondary }]}>#{image.id}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={toggleFavorite}
        activeOpacity={0.6}
      >
        <Text style={styles.favoriteIcon}>{favorited ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: SPACING.xs,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: SPACING.sm,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  id: {
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
  },
});
