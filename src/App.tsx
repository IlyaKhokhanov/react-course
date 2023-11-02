import { useEffect, useState } from 'react';
import './App.scss';
import { request } from './api';
import { IRequest, IState } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [state, setState] = useState<IState>({
    currentPage: 1,
    searchString: localStorage.getItem('searchString') || '',
    list: [],
    isLoading: true,
    countElements: 0,
    itemsPerPage: 10,
  });

  function updateList() {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    request<IRequest>(
      `https://swapi.dev/api/people/?page=${state.currentPage}&search=${state.searchString}`,
    )
      .then((data) => {
        if (typeof data !== 'string') {
          setState((prev) => ({
            ...prev,
            list: data.results,
            isLoading: false,
            countElements: data.count,
          }));
        }
      })
      .catch((err) => console.error(err));
  }

  function setSearchString(string: string) {
    localStorage.setItem('searchString', string);
    setState((prev) => ({
      ...prev,
      searchString: string,
      currentPage: 1,
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
      {state.isLoading ? <Loader /> : <List data={state} />}
      {state.isLoading && <Pagination data={state} />}
    </div>
  );
}

export default App;
