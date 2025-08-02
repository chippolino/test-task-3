import cn from 'classnames';
import { useState } from 'react';
import { useImageModal, useImageSearch } from '../../model/hooks';
import { isValidQuery } from '../../model/utils/validation';
import { ImageForm } from '../image-form/image-form.tsx';
import { ImageList } from '../image-list/image-list.tsx';
import { SearchImageModal } from '../image-modal/image-modal.tsx';
import s from './image-search.module.scss';

export const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const {
    images,
    loading,
    error,
    totalResults,
    hasSearched,
    searchImages,
    clearError
  } = useImageSearch();
  const { isModalOpen, modalImage, openModal, closeModal } = useImageModal();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!isValidQuery(query)) return;
    searchImages(query);
  };

  const handleClearQuery = () => {
    setQuery('');
    clearError();
  };

  return (
    <div
      className={cn(s.root, {
        [s.rootScroll]: totalResults > 30
      })}
    >
      <div className={cn('container', s.wrap)}>
        <ImageForm
          query={query}
          setQuery={setQuery}
          error={error}
          loading={loading}
          count={images.length}
          handleSearch={handleSearch}
          onClear={handleClearQuery}
        />

        {error && (
          <div className={s.empty}>
            <p className={s.text}>{error}</p>
          </div>
        )}

        {images.length > 0 && (
          <ImageList images={images} handleOpenModal={openModal} />
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
        onClose={closeModal}
      />
    </div>
  );
};
