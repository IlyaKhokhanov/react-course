import { useEffect, useState } from 'react';
import { request } from './api';
import { IRequestList, IState } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import './App.scss';
import OpenCard from './components/OpenCard/OpenCard';
import { Context } from './components/context/Context';

function App() {
  const [state, setState] = useState<IState>({
    currentPage: 1,
    searchString: localStorage.getItem('searchString') || '',
    list: [],
    isLoading: true,
    countElements: 0,
    itemsPerPage: 10,
    currentElement: '',
  });

  function updateList() {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    request<IRequestList>(
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

  useEffect(() => {
    updateList();
  }, [state.searchString, state.currentPage]);

  return (
    <Context.Provider value={[state, setState]}>
      <div>
        <button
          className="error-btn"
          onClick={() => {
            throw new Error('Something went wrong');
          }}
        >
          Generate ERROR
        </button>
        <Search />
        <div className="main">
          <div
            className="block-left"
            style={{ width: state.currentElement ? '50%' : '100%' }}
          >
            {state.isLoading ? (
              <Loader />
            ) : (
              <>
                <List />
                <Pagination />
              </>
            )}
          </div>
          {state.currentElement && <OpenCard />}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
