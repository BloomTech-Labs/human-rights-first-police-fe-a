import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { stateData } from '../assets/bargraphAssets';

// CSS
import theme from './SearchBar.css';

const data = [];
for (let state in stateData) {
  let item = {
    name: state,
    ...stateData[state],
  };
  data.push(item);
}

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data.filter(
        state =>
          state.name.toLowerCase().slice(0, inputLength) === inputValue ||
          state.abbreviation.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className="search-item">{suggestion.name}</div>
);

const shouldRenderSuggestions = (value, reason) => {
  return value.trim().length >= 2;
};

const SearchBar = ({ setUsState }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => setValue(newValue); // Should set Input
  const onClick = e => {
    setValue('');
    setUsState(null);
  }; // Clear Input and US State

  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value)); // Should set suggestions

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex }
  ) => setUsState(suggestionValue);

  const renderInputComponent = inputProps => (
    <div className="search-bar">
      <input {...inputProps} className="user-input" />
      <span onClick={onClick}>&#x2716;</span>
    </div>
  );

  const inputProps = {
    placeholder: 'Enter a US State',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      shouldRenderSuggestions={shouldRenderSuggestions}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
      theme={theme}
    />
  );
};

export default SearchBar;
