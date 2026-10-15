import { ImageItem } from '../types';

const API_BASE = 'https://picsum.photos/v2/list';
const REQUEST_TIMEOUT_MS = 15000;


const THUMB_WIDTH = 400;
const THUMB_HEIGHT = 300;
const FULL_WIDTH = 1200;
const FULL_HEIGHT = 900;

interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const buildThumbUrl = (id: string): string =>
  `https://picsum.photos/id/${id}/${THUMB_WIDTH}/${THUMB_HEIGHT}`;

export const buildFullUrl = (id: string): string =>
  `https://picsum.photos/id/${id}/${FULL_WIDTH}/${FULL_HEIGHT}`;

export const fetchImages = async (page: number, limit: number): Promise<ImageItem[]> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}?page=${page}&limit=${limit}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const photos: PicsumPhoto[] = await response.json();

    return photos.map((photo) => ({
      id: photo.id,
      url: buildThumbUrl(photo.id),
      fullUrl: buildFullUrl(photo.id),
      author: photo.author,
      width: photo.width,
      height: photo.height,
      sourceUrl: photo.url,
    }));
  } finally {
    clearTimeout(timeout);
  }
};
