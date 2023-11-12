import React, { useContext, useState } from 'react';
import './Search.scss';
import { Context } from '../context/Context';

function Search() {
  const [input, setInput] = useState(
    localStorage.getItem('searchString') || '',
  );

  const setState = useContext(Context)![1];

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function setSearchString(string: string) {
    localStorage.setItem('searchString', string);
    setState((prev) => ({
      ...prev,
      searchString: string,
      currentPage: 1,
    }));
  }

  return (
    <div className="header">
      <input
        className="header-input"
        defaultValue={input}
        type="text"
        onChange={inputChange}
      />
      <button className="header-btn" onClick={() => setSearchString(input)}>
        Search
      </button>
    </div>
  );
}

export default Search;
