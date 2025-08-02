import { UNSPLASH_API } from './constants';
import type { SearchResponse } from './types/types';

export class UnsplashAPI {
  private static buildUrl(query: string, page: number): string {
    const params = new URLSearchParams({
      query: encodeURIComponent(query),
      page: page.toString(),
      per_page: UNSPLASH_API.IMAGES_PER_PAGE.toString(),
      client_id: UNSPLASH_API.ACCESS_KEY
    });

    return `${UNSPLASH_API.BASE_URL}?${params.toString()}`;
  }

  static async searchImages(
    query: string,
    page: number = 1
  ): Promise<SearchResponse> {
    const response = await fetch(this.buildUrl(query, page));

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
  }
}
