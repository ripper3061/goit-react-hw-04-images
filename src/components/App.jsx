import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { AppLayout, ErrorMessage } from './App.styled';
import { getImagesByName } from 'services/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const fetchedImages = await getImagesByName(searchQuery, page);

        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setTotalHits(fetchedImages.totalHits);

        if (fetchedImages.totalHits === 0) {
          setError('Sorry, there are no images matching your search query.');
        }
      } catch {
        setError('Ops, failed to load. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = inputValue => {
    if (!inputValue) {
      return setError('Enter your query to search');
    }

    if (inputValue === searchQuery) {
      return alert('You already see the results on request');
    }

    if (inputValue !== searchQuery) {
      setSearchQuery(inputValue);
      setImages([]);
      setPage(1);
      setError('');
      setLoading(true);
      setTotalHits(null);
    }
  };

  const handleClickOnLoadBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const shownLoadMoreBtn = !loading && images.length < totalHits;

  return (
    <AppLayout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      <Loader loading={loading} />
      {error && images.length === 0 && <ErrorMessage>{error}</ErrorMessage>}

      {shownLoadMoreBtn && <Button onClick={handleClickOnLoadBtn} />}
    </AppLayout>
  );
}
