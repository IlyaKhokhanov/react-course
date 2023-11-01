import { useEffect, useState } from 'react';
import './App.scss';
import { request } from './api';
import { IRequest, IState } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';

function App() {
  const [state, setState] = useState<IState>({
    currentPage: 1,
    searchString: localStorage.getItem('searchString') || '',
    list: [],
  });

  function updateList() {
    request<IRequest>(
      `https://swapi.dev/api/people/?search=${state.searchString}`,
    )
      .then((data) => {
        if (typeof data !== 'string') {
          setState((prev) => ({
            ...prev,
            list: data.results,
          }));
        }
      })
      .catch((err) => console.error(err));
  }

  function setSearchString(string: string) {
    localStorage.setItem('searchString', state.searchString);
    setState((prev) => ({
      ...prev,
      searchString: string,
    }));
  }

  useEffect(() => {
    updateList();
  }, [state.searchString, state.currentPage]);

  return (
    <div>
      <button
        className="error-btn"
        onClick={() => {
          throw new Error('Something went wrong');
        }}
      >
        Generate ERROR
      </button>
      <Search searchHandler={setSearchString} />
      <List data={state.list} />
    </div>
  );
}

export default App;
