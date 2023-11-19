import React, { useEffect, useState } from 'react';
import './OpenCard.scss';
import { request } from '../../api';
import { requestObj } from '../../types';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentElement } from '../../redux/slices/application';

function OpenCard() {
  const [openCard, setOpenCard] = useState<requestObj | null>(null);

  const dispatch = useAppDispatch();
  const { currentElement } = useAppSelector((state) => state.application);

  async function requestCard() {
    setOpenCard(null);
    request<requestObj>(currentElement)
      .then((data) => {
        if (typeof data !== 'string') {
          setOpenCard(data);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    requestCard();
  }, [currentElement]);

  if (!openCard) {
    return <Loader />;
  }

  return (
    <div className="open-card">
      <button
        className="open-card-btn"
        onClick={() => dispatch(setCurrentElement(''))}
      >
        ✕
      </button>
      <h2 className="open-card-header">{openCard.name}</h2>
      <div>
        <span className="open-card-desc">Gender: </span>
        <span>{openCard.gender}</span>
      </div>
      <div>
        <span className="open-card-desc">Birthday: </span>
        <span>{openCard.birth_year}</span>
      </div>
      <div>
        <span className="open-card-desc">Created: </span>
        <span>{new Date(openCard.created).toLocaleString()}</span>
      </div>
      <div>
        <span className="open-card-desc">Edited: </span>
        <span>{new Date(openCard.edited).toLocaleString()}</span>
      </div>
      <div>
        <span className="open-card-desc">Height: </span>
        <span>{openCard.height}</span>
      </div>
      <div>
        <span className="open-card-desc">Weight: </span>
        <span>{openCard.mass}</span>
      </div>
      <div>
        <span className="open-card-desc">Color skin: </span>
        <span>{openCard.skin_color}</span>
      </div>
      <div>
        <span className="open-card-desc">Color hair: </span>
        <span>{openCard.hair_color}</span>
      </div>
      <div>
        <span className="open-card-desc">Color eye: </span>
        <span>{openCard.eye_color}</span>
      </div>
    </div>
  );
}

export default OpenCard;
