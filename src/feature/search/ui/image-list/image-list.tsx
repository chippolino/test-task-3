import s from "./image-list.module.scss";
import type { UnsplashImage } from "../../model/types/types.ts";

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
          onClick={() => handleOpenModal(image.urls.small)}
        >
          <img
            src={image.urls.small}
            alt={image.alt_description || "Unsplash image"}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};
