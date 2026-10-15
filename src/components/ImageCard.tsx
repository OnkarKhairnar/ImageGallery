import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { ImageItem } from '../types';
import { SPACING, FONT_SIZES, RADIUS, SHADOWS } from '../constants';

interface Props {
  image: ImageItem;
  onPress: () => void;
}

export default function ImageCard({ image, onPress }: Props) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const [failed, setFailed] = useState(false);
  const favorited = isFavorite(image.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(image.id);
      showToast('Removed from favorites', 'info');
    } else {
      addFavorite(image);
      showToast('Added to favorites', 'success');
    }
  };

  return (
    <View style={[styles.wrapper, SHADOWS.sm, { backgroundColor: colors.card }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {failed ? (
          <View style={[styles.image, styles.fallback, { backgroundColor: colors.skeleton }]}>
            <Text style={styles.fallbackIcon}>{'🖼️'}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: image.url }}
            style={styles.image}
            contentFit="cover"
            transition={220}
            cachePolicy="memory-disk"
            recyclingKey={image.id}
            onError={() => setFailed(true)}
          />
        )}
        <View style={styles.info}>
          <Text style={[styles.author, { color: colors.text }]} numberOfLines={1}>
            {image.author}
          </Text>
          <Text style={[styles.id, { color: colors.textSecondary }]}>#{image.id}</Text>
        </View>
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: colors.card + 'E6' }]}
          onPress={toggleFavorite}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <Text style={styles.favoriteIcon}>{favorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  card: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackIcon: {
    fontSize: 28,
    opacity: 0.5,
  },
  info: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  id: {
    fontSize: FONT_SIZES.xs,
    marginTop: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
  },
});
