import React from 'react';

const Source = props => {
  const { source, removeSrc } = props;

  //   remove source!
  const removeSrcHandler = evt => {
    evt.preventDefault();
    removeSrc(source);
  };

  return (
    <div className="source">
      <p className="source-text-toggled">{source}</p>
      <button className="remove-src" onClick={removeSrcHandler}>
        Remove Source
      </button>
    </div>
  );
};

export default Source;
