import cn from "classnames";
import s from "./image-search.module.scss";
import { SearchImageModal } from "../image-modal/image-modal.tsx";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import type { SearchResponse, UnsplashImage } from "../../model/types/types.ts";
import { ImageList } from "../image-list/image-list.tsx";
import { ImageForm } from "../image-form/image-form.tsx";

const APU_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs";
const IMAGES_PER_PAGE = 30;

export const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchImages = async (
    searchQuery: string,
    pageNum: number = 1,
    append: boolean = false,
  ) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${APU_URL}?query=${encodeURIComponent(searchQuery)}&page=${pageNum}&per_page=${IMAGES_PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data: SearchResponse = await response.json();

      if (append) {
        setImages((prev) => {
          const existingIds = new Set(prev.map((img) => img.id));
          const newImages = data.results.filter(
            (img) => !existingIds.has(img.id),
          );
          return [...prev, ...newImages];
        });
      } else {
        setImages(data.results);
        setTotalResults(data.total);
      }

      setHasMore(pageNum < data.total_pages);
    } catch (err) {
      setError(
        "Произошла ошибка при загрузке изображений. Проверьте API ключ.",
      );
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e?: FormEvent | KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setPage(1);
    setImages([]);
    setHasMore(true);
    setHasSearched(true);
    void searchImages(query, 1);
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore && query) {
      const nextPage = page + 1;
      setPage(nextPage);
      void searchImages(query, nextPage, true);
    }
  }, [loading, hasMore, query, page]);

  const handleOpenModal = (image: string) => {
    setIsModalOpen(true);
    setModalImage(image);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);
  return (
    <div
      className={cn(s.root, {
        [s.rootScroll]: totalResults > 30,
      })}
    >
      <div className={cn("container", s.wrap)}>
        <ImageForm
          query={query}
          setQuery={setQuery}
          error={error}
          loading={loading}
          count={images.length}
          handleSearch={handleSearch}
        />

        {error && (
          <div className={s.empty}>
            <p className={s.text}>{error}</p>
          </div>
        )}

        {images.length > 0 && (
          <ImageList images={images} handleOpenModal={handleOpenModal} />
        )}

        {!loading && images.length === 0 && hasSearched && !error && (
          <div className={s.empty}>
            <p className={s.text}>К сожалению, поиск не дал результатов</p>
          </div>
        )}
      </div>

      <SearchImageModal
        image={modalImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
