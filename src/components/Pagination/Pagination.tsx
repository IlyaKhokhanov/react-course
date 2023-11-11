import React, { useContext } from 'react';
import './Pagination.scss';
import { Context } from '../context/Context';

function Pagination() {
  const state = useContext(Context)![0];
  const setState = useContext(Context)![1];

  const numbersArr = [];

  for (
    let i = 1;
    i <= Math.ceil(state.countElements / state.itemsPerPage);
    i++
  ) {
    numbersArr.push(i);
  }

  function setCurrentPage(number: number) {
    setState((prev) => ({
      ...prev,
      currentPage: number,
    }));
  }

  return (
    <ul className="pagination">
      {numbersArr.map((el) => (
        <li
          key={el}
          className={
            el === state.currentPage
              ? 'pagination-item-active'
              : 'pagination-item'
          }
          onClick={() => setCurrentPage(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
