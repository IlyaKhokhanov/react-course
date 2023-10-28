import React from 'react';
import { request } from '../../api';
import { IRequest, requestObj } from '../../types';
import './Search.scss';

interface IProps {}

interface IState {
  input: string;
  list: requestObj[];
}

export class Search extends React.Component<IProps, IState> {
  constructor(props: never) {
    super(props);
    this.state = {
      input: localStorage.getItem('searchString') || '',
      list: [],
    };
    this.inputChange = this.inputChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.searchHandler();
  }

  inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      input: e.target.value,
    });
  }

  searchHandler() {
    localStorage.setItem('searchString', this.state.input);
    request<IRequest>(
      `https://swapi.dev/api/people/?search=${this.state.input}`,
    )
      .then((data) => {
        if (typeof data !== 'string') {
          console.log(data.results);
          this.setState({
            ...this.state,
            list: data.results,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="header">
          <input
            className="header-input"
            defaultValue={localStorage.getItem('searchString') || ''}
            type="text"
            onChange={this.inputChange}
          />
          <button className="header-btn" onClick={this.searchHandler}>
            Search
          </button>
        </div>

        <div className="list">
          {this.state.list.map((el, indx) => (
            <div key={indx} className="list-item">
              <h3 className="list-item-header">{el.name}</h3>
              <div>
                <span className="list-item-desc">Height: </span>
                <span>{el.height}</span>
              </div>
              <div>
                <span className="list-item-desc">Weight: </span>
                <span>{el.mass}</span>
              </div>
              <div>
                <span className="list-item-desc">Color skin: </span>
                <span>{el.skin_color}</span>
              </div>
              <div>
                <span className="list-item-desc">Color hair: </span>
                <span>{el.hair_color}</span>
              </div>
              <div>
                <span className="list-item-desc">Color eye: </span>
                <span>{el.eye_color}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
