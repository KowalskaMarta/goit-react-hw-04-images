import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './SearchBar.module.css';

const Searchbar = ({ onSubmit }) => {

 const [search, setSearch] = useState('');

  const handleChangeInput = ({ target: { value } }) => {
    setSearch(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images. Please try again.'
      );
      return;
    }
    onSubmit(search);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          &#x1F50E;
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          onChange={handleChangeInput}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;