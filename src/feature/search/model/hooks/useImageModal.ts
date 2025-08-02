import { useCallback, useState } from 'react';

interface UseImageModalReturn {
  isModalOpen: boolean;
  modalImage: string;
  openModal: (image: string) => void;
  closeModal: () => void;
}

export const useImageModal = (): UseImageModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = useCallback((image: string) => {
    setIsModalOpen(true);
    setModalImage(image);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalImage('');
  }, []);

  return {
    isModalOpen,
    modalImage,
    openModal,
    closeModal
  };
};
