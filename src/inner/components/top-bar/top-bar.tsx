import React from 'react';
import { withRouter } from 'react-router-dom';

import * as config from '../../../config';
import '../../styles/theme-base.scss';

import './top-bar.scss';

const { home } = config.pages;

export const TopBar= withRouter(({ history }) =>  {
  return (
    <div className="top-bar">
      <span className="circle-icon" onClick={() => { history.push(home.innerUri) }}>M</span>
      <div className="top-bar-title">Matt Billard</div>
    </div>
  );
})
