import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageItem, TabScreenNavigationProp } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { SPACING, FONT_SIZES, GALLERY_COLUMNS } from '../constants';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';

type Props = {
  navigation: TabScreenNavigationProp;
};

export default function FavoritesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { favorites } = useFavorites();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const query = searchQuery.trim().toLowerCase();
    return favorites.filter((img) => img.author.toLowerCase().includes(query));
  }, [favorites, searchQuery]);

  const renderItem = ({ item }: { item: ImageItem }) => (
    <ImageCard
      image={item}
      onPress={() => navigation.navigate('ImageDetails', { image: item })}
    />
  );

  const keyExtractor = (item: ImageItem) => item.id;

  const renderEmpty = () => {
    if (searchQuery.trim()) {
      return (
        <View style={styles.center}>
          <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>{'🔍'}</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No favorites match "{searchQuery}"
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.center}>
        <View style={[styles.emptyBadge, { backgroundColor: colors.primarySoft }]}>
          <Text style={styles.emptyBadgeIcon}>{'❤️'}</Text>
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No favorites yet</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Tap the heart icon on any image to save it here
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Favorites</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {favorites.length} {favorites.length === 1 ? 'image' : 'images'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.controls}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search favorites by author..."
          />
        </View>

        <FlatList
          data={filteredFavorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={GALLERY_COLUMNS}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  controls: {
    paddingHorizontal: SPACING.md,
  },
  list: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: 60,
  },
  emptyBadge: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyBadgeIcon: {
    fontSize: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
});