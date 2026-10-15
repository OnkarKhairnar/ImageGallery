import { Platform } from 'react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export type DownloadResult = {
  success: boolean;
  message: string;
};

export const downloadImage = async (imageUrl: string): Promise<DownloadResult> => {
  if (Platform.OS === 'web') {
    try {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `image_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, message: 'Download started' };
    } catch {
      return { success: false, message: 'Download failed on web.' };
    }
  }

  try {
    const filename = `image_${Date.now()}.jpg`;
    const destination = new File(Paths.cache, filename);
    const downloadedFile = await File.downloadFileAsync(imageUrl, destination);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(downloadedFile.uri);
      return { success: true, message: 'Image ready to save' };
    }

    return { success: true, message: 'Image saved to cache' };
  } catch (error) {
    console.error('Download failed:', error);
    return { success: false, message: 'Failed to download image. Please try again.' };
  }
};
