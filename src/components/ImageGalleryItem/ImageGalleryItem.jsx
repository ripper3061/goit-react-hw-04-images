import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imageUrl, tags, largeImageUrl } = this.props;

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryItemImage src={imageUrl} alt={tags} loading="lazy" />
        </GalleryItem>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImg={largeImageUrl}
            alt={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
