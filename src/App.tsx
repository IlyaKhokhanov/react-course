import { useEffect } from 'react';
import { request } from './api';
import { IRequestList } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import './App.scss';
import OpenCard from './components/OpenCard/OpenCard';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {
  setCountElements,
  setList,
  setLoading,
} from './redux/slices/application';

function App() {
  const dispatch = useAppDispatch();
  const { currentPage, searchString, currentElement, isLoading } =
    useAppSelector((state) => state.application);

  function updateList() {
    dispatch(setLoading(true));
    request<IRequestList>(
      `https://swapi.dev/api/people/?page=${currentPage}&search=${searchString}`,
    )
      .then((data) => {
        if (typeof data !== 'string') {
          dispatch(setList(data.results));
          dispatch(setLoading(true));
          dispatch(setCountElements(data.count));
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateList();
  }, [searchString, currentPage]);

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
      <Search />
      <div className="main">
        <div
          className="block-left"
          style={{ width: currentElement ? '50%' : '100%' }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <List />
              <Pagination />
            </>
          )}
        </div>
        {currentElement && <OpenCard />}
      </div>
    </div>
  );
}

export default App;
