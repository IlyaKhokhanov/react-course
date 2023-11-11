import React, { useContext } from 'react';
import { requestObj } from '../../types';
import './Card.scss';
import { Context } from '../context/Context';

type CardProps = {
  card: requestObj;
};

function Card({ card }: CardProps) {
  const state = useContext(Context)![0];
  const setState = useContext(Context)![1];

  function setCurrentElement(url: string) {
    setState((prev) => ({
      ...prev,
      currentElement: url,
    }));
  }

  return (
    <li
      className={
        state.currentElement === card.url ? 'list-item-active' : 'list-item'
      }
      onClick={() => {
        setCurrentElement(state.currentElement === card.url ? '' : card.url);
      }}
    >
      <h3 className="list-item-header">{card.name}</h3>
      <div>
        <span className="list-item-desc">Height: </span>
        <span>{card.height}</span>
      </div>
      <div>
        <span className="list-item-desc">Weight: </span>
        <span>{card.mass}</span>
      </div>
      <div>
        <span className="list-item-desc">Color skin: </span>
        <span>{card.skin_color}</span>
      </div>
      <div>
        <span className="list-item-desc">Color hair: </span>
        <span>{card.hair_color}</span>
      </div>
    </li>
  );
}

export default Card;
