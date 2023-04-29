import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

export const Loader = ({ loading }) => {
  return (
    <ClipLoader
      color="blue"
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={{ margin: 'auto' }}
    />
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
