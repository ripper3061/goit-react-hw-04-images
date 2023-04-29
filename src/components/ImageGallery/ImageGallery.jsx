import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryLayout } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryLayout>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            imageUrl={image.webformatURL}
            tags={image.tags}
            largeImageUrl={image.largeImageURL}
          />
        );
      })}
    </ImageGalleryLayout>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
