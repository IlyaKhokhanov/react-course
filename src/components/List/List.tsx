import React from 'react';
import Card from '../Card/Card';
import { IState } from '../../types';
import './List.scss';

type ListProps = {
  data: IState;
};

function List({ data }: ListProps) {
  return (
    <ul className="list">
      {data.list.map((el, indx) => (
        <Card key={indx} {...el} />
      ))}
    </ul>
  );
}

export default List;
