import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ImgModal } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImg, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ImgModal src={largeImg} alt={alt} />
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};

// export class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     alt: PropTypes.string.isRequired,
//     largeImg: PropTypes.string.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImg, alt } = this.props;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ImgModal src={largeImg} alt={alt} />
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
