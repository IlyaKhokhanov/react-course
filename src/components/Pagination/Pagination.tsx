import React from 'react';
import { IState } from '../../types';
import './Pagination.scss';

type PaginationProps = {
  data: IState;
};

function Pagination({ data }: PaginationProps) {
  return (
    <ul className="pagination">
      {data.list.map((el, indx) => (
        <div key={indx}>{el.name}</div>
      ))}
    </ul>
  );
}

export default Pagination;
