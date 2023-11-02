import { useEffect, useState } from 'react';
import { request } from './api';
import { IRequest, IState } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import './App.scss';

function App() {
  const [state, setState] = useState<IState>({
    currentPage: 1,
    searchString: localStorage.getItem('searchString') || '',
    list: [],
    isLoading: true,
    countElements: 0,
    itemsPerPage: 10,
    currentElement: 'fsd',
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

  function setCurrentPage(number: number) {
    setState((prev) => ({
      ...prev,
      currentPage: number,
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
      <div className="main">
        <div className="block-left">
          {state.isLoading ? (
            <Loader />
          ) : (
            <>
              <List data={state} />
              <Pagination
                totalCount={state.countElements}
                itemsPerPage={state.itemsPerPage}
                currentPage={state.currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
        {state.currentElement && <div>{state.currentElement}</div>}
      </div>
    </div>
  );
}

export default App;
