import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarLayout,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState();

  const handleChange = event => {
    setInputValue(event.currentTarget.value.trim());
  };

  const handleInputSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <SearchbarLayout>
      <SearchForm onSubmit={handleInputSubmit}>
        <SearchFormBtn type="submit">
          <BiSearch size="24" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          // value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarLayout>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
