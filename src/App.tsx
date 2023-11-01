import { useEffect, useState } from 'react';
import './App.scss';
import { request } from './api';
import { IRequest, IState } from './types';
import List from './components/List/List';

function App() {
  const [state, setState] = useState<IState>({
    currentPage: 1,
    searchString: localStorage.getItem('searchString') || '',
    list: [],
  });

  function updateList() {
    localStorage.setItem('searchString', state.searchString);
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

  // function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setState({
  //     ...state,
  //     searchString: e.target.value,
  //   });
  // }

  useEffect(() => {
    updateList();
  }, [state.searchString]);

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
      <List data={state.list} />
    </div>
  );
}

export default App;
