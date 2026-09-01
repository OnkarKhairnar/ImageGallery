import { ImageItem } from '../types';

const TAGS = 'offroad,car,suv,4x4';
const WIDTH = 600;
const HEIGHT = 400;

export const fetchImages = async (page: number, limit: number): Promise<ImageItem[]> => {
  const images: ImageItem[] = [];
  const startId = (page - 1) * limit + 1;

  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    images.push({
      id: id.toString(),
      url: `https://loremflickr.com/${WIDTH}/${HEIGHT}/${TAGS}?lock=${id}`,
      author: `Offroad Car #${id}`,
      width: WIDTH,
      height: HEIGHT,
    });
  }

  return images;
};
