import React, { useEffect, useState } from 'react';
import { fetchPhoto } from '../services/pixabay-api';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';

const App = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [hitsTotal, setHitsTotal] = useState(0);
  const [error, setError] = useState('');
  const [ModalShow, setModalShow] = useState(false);
  const [Page, setPage] = useState(1);

  const searchSubmit = search => {
    setError('');
    setPage(1);
    setCards([]);
    setQuery(search);
  };

  const handleButton = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (query) {
      fetchSearch(query, Page);
    }
    
  }, [query, Page]);

  const fetchSearch = async (valueSearch, valuePage) => {
    setIsLoading(true);
    try {
      const response = await fetchPhoto(valueSearch, valuePage);

      if (response.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images. Please try again.'
        );
        return;
      }
      setHitsTotal(response.hitsTotal);
      setCards(prev => [...prev, ...response.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const ModalClose = () => {
    setModalShow(false);
    setBigImage('');
  };

  const ModalOpen = url => {
    setModalShow(true);
    setBigImage(url);
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      <Searchbar onSubmit={searchSubmit} />
      <ImageGallery cards={cards} onShow={ModalOpen} />
      {isLoading && <Loader />}
      {cards.length !== 0 && cards.length !== hitsTotal && (
        <Button onClick={handleButton} />
      )}
      {ModalShow && (
        <Modal onClose={ModalClose} image={bigImage} />
      )}
    </div>
  );
};

export default App;