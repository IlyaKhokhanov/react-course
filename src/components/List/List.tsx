import React from 'react';
import Card from '../Card/Card';
import './List.scss';
import { useAppSelector } from '../../hooks/hooks';

function List() {
  const { list } = useAppSelector((state) => state.application);

  return (
    <ul className="list">
      {list.map((el, indx) => (
        <Card key={indx} card={el} />
      ))}
    </ul>
  );
}

export default List;
