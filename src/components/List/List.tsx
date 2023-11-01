import React from 'react';
import Card from '../Card/Card';
import { requestObj } from '../../types';
import './List.scss';

type ListProps = {
  data: requestObj[];
};

function List({ data }: ListProps) {
  return (
    <ul className="list">
      {data.map((el, indx) => (
        <Card key={indx} {...el} />
      ))}
    </ul>
  );
}

export default List;
