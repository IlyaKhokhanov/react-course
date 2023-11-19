import React from 'react';
import { requestObj } from '../../types';
import './Card.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentElement } from '../../redux/slices/application';

type CardProps = {
  card: requestObj;
};

function Card({ card }: CardProps) {
  const dispatch = useAppDispatch();
  const { currentElement } = useAppSelector((state) => state.application);

  return (
    <li
      className={currentElement === card.url ? 'list-item-active' : 'list-item'}
      onClick={() => {
        dispatch(
          setCurrentElement(currentElement === card.url ? '' : card.url),
        );
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
