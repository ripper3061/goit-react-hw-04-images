import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { AppLayout, ErrorMessage } from './App.styled';
import { getImagesByName } from 'services/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [firstSearch, setFirstSearch] = useState('');
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMoreShown, setLoadMoreShown] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const fetchedImages = await getImagesByName(searchQuery, page);

        setImages([...images, ...fetchedImages.hits]);
        setLoadMoreShown(images.length < fetchedImages.totalHits);

        if (fetchedImages.totalHits === 0) {
          setError('Sorry, there are no images matching your search query.');
        }
      } catch {
        setError('Ops, failed to load. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = (inputValue, event) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return setError('Enter your query to search');
    }

    if (!firstSearch) {
      setFirstSearch(inputValue);
    }

    if (firstSearch === searchQuery) {
      return alert('You already see the results on request');
    }

    setImages([]);
    setPage(1);
    setLoading(true);
  };

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
    setFirstSearch('');
  };

  const handleClickOnLoadBtn = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  return (
    <AppLayout>
      <Searchbar
        onSubmit={handleSubmit}
        inputValue={searchQuery}
        onChange={handleChange}
      />
      <Loader loading={loading} />
      {images.length > 0 && <ImageGallery images={images} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && loadMoreShown && <Button onClick={handleClickOnLoadBtn} />}
    </AppLayout>
  );
}