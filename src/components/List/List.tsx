import React, { useContext } from 'react';
import Card from '../Card/Card';
import './List.scss';
import { Context } from '../context/Context';

function List() {
  const state = useContext(Context)![0];

  return (
    <ul className="list">
      {state.list.map((el, indx) => (
        <Card key={indx} card={el} />
      ))}
    </ul>
  );
}

export default List;
