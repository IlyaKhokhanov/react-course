import React from 'react';
import { requestObj } from '../../types';

function Card(card: requestObj) {
  return (
    <li className="list-item">
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
      <div>
        <span className="list-item-desc">Color eye: </span>
        <span>{card.eye_color}</span>
      </div>
    </li>
  );
}

export default Card;
