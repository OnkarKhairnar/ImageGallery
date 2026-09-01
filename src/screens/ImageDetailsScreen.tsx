import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { downloadImage } from '../services/downloadService';
import { SPACING, FONT_SIZES } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetails'>;

export default function ImageDetailsScreen({ route }: Props) {
  const { image } = route.params;
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const [viewerVisible, setViewerVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownload = async () => {
    setIsDownloading(true);
    const result = await downloadImage(image.url);
    setIsDownloading(false);
    showToast(result.message, result.success ? 'success' : 'error');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setViewerVisible(true)}>
          <Image
            source={{ uri: image.url }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={[styles.author, { color: colors.text }]}>{image.author}</Text>
              <Text style={[styles.id, { color: colors.textSecondary }]}>#{image.id}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: favorited ? colors.error + '20' : colors.card,
                  borderColor: favorited ? colors.error : colors.border,
                },
              ]}
              onPress={toggleFavorite}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{favorited ? '❤️' : '🤍'}</Text>
              <Text style={[styles.actionText, { color: favorited ? colors.error : colors.text }]}>
                {favorited ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.primary + '20', borderColor: colors.primary },
              ]}
              onPress={handleDownload}
              disabled={isDownloading}
              activeOpacity={0.7}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <>
                  <Text style={styles.actionIcon}>⬇️</Text>
                  <Text style={[styles.actionText, { color: colors.primary }]}>Download</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.detailsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.detailsTitle, { color: colors.text }]}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Author</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{image.author}</Text>
            </View>
            <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Image ID</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>#{image.id}</Text>
            </View>
            <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Resolution</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {image.width} x {image.height}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={viewerVisible} transparent animationType="fade">
        <View style={styles.viewerOverlay}>
          <TouchableOpacity
            style={styles.viewerClose}
            onPress={() => setViewerVisible(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.viewerCloseText}>X</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: image.url }}
            style={styles.viewerImage}
            resizeMode="contain"
          />

          <View style={styles.viewerActions}>
            <TouchableOpacity
              style={[styles.viewerButton, { backgroundColor: colors.card }]}
              onPress={toggleFavorite}
              activeOpacity={0.7}
            >
              <Text style={styles.viewerButtonIcon}>{favorited ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewerButton, { backgroundColor: colors.primary }]}
              onPress={handleDownload}
              disabled={isDownloading}
              activeOpacity={0.7}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color={colors.card} />
              ) : (
                <Text style={styles.viewerButtonIcon}>⬇️</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  titleBlock: {
    flex: 1,
  },
  author: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  id: {
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm + 2,
    borderRadius: 12,
    borderWidth: 1,
    gap: SPACING.xs,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  detailsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: SPACING.lg,
  },
  detailsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZES.md,
  },
  detailValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  detailDivider: {
    height: 1,
  },
  viewerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  viewerCloseText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  viewerImage: {
    width: '90%',
    height: '70%',
  },
  viewerActions: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    gap: SPACING.md,
  },
  viewerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerButtonIcon: {
    fontSize: 20,
  },
});
