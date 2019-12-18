import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getHomeText, IStoreState } from '../../../redux';
import { tellParentToUpdateUrl } from '../../../../shared/utils/utils';

import './home.scss';

export interface IHome { }

export const Home: React.FC<IHome> = (props) => {
  const homeText = useSelector((state: IStoreState) => state.textReducer.homeText);
  const dispatch = useDispatch();

  useEffect(() => {
    !homeText && dispatch(getHomeText());
    tellParentToUpdateUrl('home');
  });

  if (!homeText) {
    return null;
  }

  return (
    <div className="home">

      <div>
        <div className="logo-big">
          <i className="fab fa-react"></i>
        </div>
        <div className="logo-small">
          <i className="fab fa-vuejs"></i>
          <i className="fab fa-js"></i>
          <i className="fab fa-node-js"></i>
          <i className="fab fa-java"></i>
          <i className="fab fa-python"></i>
        </div>
      </div>

      <div>
        <h1>{homeText.name}</h1>
        <h2>{homeText.title}</h2>
      </div>

    </div>
  );
}
