import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export default function ImageGalleryItem({ imageUrl, tags, largeImageUrl }) {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryItemImage src={imageUrl} alt={tags} loading="lazy" />
      </GalleryItem>
      {showModal && (
        <Modal onClose={toggleModal} largeImg={largeImageUrl} alt={tags} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
