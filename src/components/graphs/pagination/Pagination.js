import React, { useState } from 'react';
import './Pagination.css';

const Button = ({ name, setGraph }) => {
  return (
    <button onClick={() => setGraph(name)} className="pagination-btn">
      {name}
    </button>
  );
};

const Pagination = ({ setGraph }) => {
  const [names] = useState(['Line', 'Bar', 'Pie']);
  return (
    <nav>
      {names.map(name => (
        <Button key={name} name={name} setGraph={setGraph} />
      ))}
    </nav>
  );
};

export default Pagination;
