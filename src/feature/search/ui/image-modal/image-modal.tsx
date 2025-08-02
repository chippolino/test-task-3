import { Modal } from "../../../../shared/ui/modal/modal.tsx";
import s from "./image-modal.module.scss";

type SearchImageModalProps = {
  image: string;
  isOpen: boolean;
  onClose: () => void;
};

export const SearchImageModal = ({
  image,
  isOpen,
  onClose,
}: SearchImageModalProps) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNameOverlay={s.overlayCurrent}
      className={s.modal}
    >
      <div className={s.modalImage}>
        <img src={image} alt="" loading="lazy" />
      </div>
    </Modal>
  );
};
