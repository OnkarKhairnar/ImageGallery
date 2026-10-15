import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageItem, FilterOption, TabScreenNavigationProp } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { fetchImages } from '../services/imageService';
import { SPACING, FONT_SIZES, GALLERY_COLUMNS, RADIUS } from '../constants';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';

type Props = {
  navigation: TabScreenNavigationProp;
};

const PAGE_SIZE = 30;
const SKELETON_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'];

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const [displayedImages, setDisplayedImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');

  const isLoadingRef = useRef(false);
  const isLoadingMoreRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadPage = useCallback(async (pageNum: number, append: boolean) => {
    if (isLoadingRef.current || isLoadingMoreRef.current || isRefreshingRef.current) {
      return;
    }

    if (pageNum > 1 && !hasMoreRef.current) {
      return;
    }

    if (append) {
      isLoadingMoreRef.current = true;
      setIsLoadingMore(true);
    } else {
      isLoadingRef.current = true;
      setIsLoading(true);
    }

    setError(null);

    try {
      const newImages = await fetchImages(pageNum, PAGE_SIZE);

      if (newImages.length < PAGE_SIZE) {
        hasMoreRef.current = false;
      }

      setAllImages((prev) => {
        if (append) {
          const existingIds = new Set(prev.map((img) => img.id));
          const unique = newImages.filter((img) => !existingIds.has(img.id));
          return [...prev, ...unique];
        }
        return newImages;
      });

      setPage(pageNum);
    } catch (err) {
      setError('Unable to load images');
      showToast('Failed to load images', 'error');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isLoadingRef.current = false;
      isLoadingMoreRef.current = false;
    }
  }, [showToast]);

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  // Debounce typing so filtering large pages stays smooth
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const applySearchAndFilter = useCallback(() => {
    let result = allImages;

    if (filter === 'A-M') {
      result = result.filter((img) => {
        const first = img.author.charAt(0).toUpperCase();
        return first >= 'A' && first <= 'M';
      });
    } else if (filter === 'N-Z') {
      result = result.filter((img) => {
        const first = img.author.charAt(0).toUpperCase();
        return first >= 'N' && first <= 'Z';
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((img) => img.author.toLowerCase().includes(query));
    }

    return result;
  }, [allImages, searchQuery, filter]);

  useEffect(() => {
    setDisplayedImages(applySearchAndFilter());
  }, [applySearchAndFilter]);

  const handleRefresh = useCallback(() => {
    if (isRefreshingRef.current || isLoadingRef.current) {
      return;
    }
    isRefreshingRef.current = true;
    setIsRefreshing(true);
    hasMoreRef.current = true;

    fetchImages(1, PAGE_SIZE)
      .then((newImages) => {
        setAllImages(newImages);
        setPage(1);
        setError(null);
        if (newImages.length < PAGE_SIZE) {
          hasMoreRef.current = false;
        }
        showToast('Gallery refreshed', 'success');
      })
      .catch(() => {
        setError('Unable to load images');
        showToast('Failed to refresh', 'error');
      })
      .finally(() => {
        setIsRefreshing(false);
        isRefreshingRef.current = false;
      });
  }, [showToast]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && !isRefreshing && !isLoading && hasMoreRef.current) {
      loadPage(page + 1, true);
    }
  }, [page, isLoading, isLoadingMore, isRefreshing, loadPage]);

  const handleRetry = useCallback(() => {
    loadPage(1, false);
  }, [loadPage]);

  const renderItem = useCallback(
    ({ item }: { item: ImageItem }) => (
      <ImageCard
        image={item}
        onPress={() => navigation.navigate('ImageDetails', { image: item })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item: ImageItem) => item.id, []);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={[styles.errorIcon, { color: colors.error }]}>{'!'}</Text>
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={handleRetry}
            activeOpacity={0.8}
          >
            <Text style={[styles.retryText, { color: colors.onPrimary }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.center}>
        <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>{'🖼'}</Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No images found
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Discover</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {displayedImages.length} images
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.controls}>
          <SearchBar value={searchInput} onChangeText={setSearchInput} />
          <FilterBar selected={filter} onSelect={setFilter} />
        </View>

        {isLoading && !isRefreshing ? (
          <View style={styles.skeletonGrid}>
            {SKELETON_KEYS.map((key) => (
              <SkeletonCard key={key} />
            ))}
          </View>
        ) : (
          <FlatList
            data={displayedImages}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={GALLERY_COLUMNS}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={7}
            removeClippedSubviews={Platform.OS === 'android'}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        )}
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
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.sm,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
  },
  retryText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
  },
});