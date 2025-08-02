import type { UnsplashImage } from '../types/types';

export const filterDuplicateImages = (
  existingImages: UnsplashImage[],
  newImages: UnsplashImage[]
): UnsplashImage[] => {
  const existingIds = new Set(existingImages.map((img) => img.id));
  return newImages.filter((img) => !existingIds.has(img.id));
};

export const getImageAltText = (image: UnsplashImage): string => {
  return image.alt_description || 'Unsplash image';
};

export const getImageUrl = (
  image: UnsplashImage,
  size: 'small' | 'regular' | 'thumb' = 'small'
): string => {
  return image.urls[size];
};
