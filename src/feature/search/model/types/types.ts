export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
    full: string;
  };
  alt_description: string;
}

export type SearchResponse = {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
};
