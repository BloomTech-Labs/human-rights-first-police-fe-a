import React, { useState, useEffect } from 'react';
import { stateData } from '../assets/bargraphAssets';

// Components
import { AutoComplete, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const data = [];
for (let state in stateData) {
  let item = {
    label: state,
    value: state,
    abbreviation: stateData[state]['abbreviation'],
  };
  data.push(item);
}

const SearchBar = ({ setUsState }) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([...data]);

  useEffect(() => {
    if (value === undefined || value.length === 0) {
      setValue('');
      setUsState(null);
    }
  }, [value, setUsState]);

  const onSearch = searchText => {
    setOptions(searchText && [...data]);
  };

  const onSelect = data => {
    setUsState(data);
  };

  const onChange = data => {
    setValue(data);
  };

  const filterOption = (inputValue, option) => {
    return inputValue.slice(0, inputValue.length).toLowerCase() ===
      option.label.slice(0, inputValue.length).toLowerCase() ||
      inputValue.toLowerCase() === option.abbreviation.toLowerCase()
      ? option
      : null;
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        onChange={onChange}
        style={{ width: 200 }}
        allowClear={true}
        filterOption={filterOption}
        placeholder="Enter a US State"
        notFoundContent="No US State Found"
      />
    </>
  );
};

export default SearchBar;
