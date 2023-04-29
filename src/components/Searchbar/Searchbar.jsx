import PropTypes from 'prop-types';
import {
  SearchbarLayout,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit, inputValue, onChange }) => {
  return (
    <SearchbarLayout>
      <SearchForm
        onSubmit={event => {
          onSubmit(inputValue, event);
        }}
      >
        <SearchFormBtn type="submit">
          <BiSearch size="24" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={onChange}
        />
      </SearchForm>
    </SearchbarLayout>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
