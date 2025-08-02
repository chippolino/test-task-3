import type { UnsplashImage } from '../../model/types/types.ts';
import { getImageAltText, getImageUrl } from '../../model/utils/imageUtils';
import s from './image-list.module.scss';

type ImageListProps = {
  images: UnsplashImage[];
  handleOpenModal: (image: string) => void;
};

export const ImageList = ({ images, handleOpenModal }: ImageListProps) => {
  return (
    <div className={s.list}>
      {images.map((image) => (
        <div
          key={image.id}
          className={s.image}
          onClick={() => handleOpenModal(getImageUrl(image))}
        >
          <img
            src={getImageUrl(image)}
            alt={getImageAltText(image)}
            loading='lazy'
          />
        </div>
      ))}
    </div>
  );
};
