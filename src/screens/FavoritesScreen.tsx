import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
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
        <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>{'❤️'}</Text>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No favorites yet</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Tap the heart icon on any image to save it here
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Favorites</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {favorites.length} {favorites.length === 1 ? 'image' : 'images'}
        </Text>
      </View>

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search favorites by author..."
        />

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
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
});
