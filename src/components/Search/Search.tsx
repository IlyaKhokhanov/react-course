import React, { useState } from 'react';
import './Search.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { setSearchString } from '../../redux/slices/application';

function Search() {
  const [input, setInput] = useState(
    localStorage.getItem('searchString') || '',
  );

  const dispatch = useAppDispatch();

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="header">
      <input
        className="header-input"
        defaultValue={input}
        type="text"
        onChange={inputChange}
      />
      <button
        className="header-btn"
        onClick={() => dispatch(setSearchString(input))}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
