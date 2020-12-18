import React, { useState } from 'react';
import './Pagination.css';

// Search Bar
import SearchBar from '../searchbar/SearchBar';

const Button = ({ name, setGraph }) => {
  return (
    <button onClick={() => setGraph(name)} className="pagination-btn">
      {name}
    </button>
  );
};

const Pagination = ({ setGraph, setUsState }) => {
  const [names] = useState(['Line', 'Bar', 'Pie']);
  return (
    <nav className="page-nav">
      <div className="link-container">
        {names.map(name => (
          <Button key={name} name={name} setGraph={setGraph} />
        ))}
      </div>

      <SearchBar setUsState={setUsState} />
    </nav>
  );
};

export default Pagination;
