import React from 'react';
import { withRouter } from 'react-router-dom';

import * as config from '../../../config';
import '../../styles/theme-base.scss';

const { pages } = config;

export const BottomBar = withRouter(({ history }) =>  {
  return (
    <div className="bottom-bar">

      {Object.values(pages).map((page, idx) => (
        <div className="bottom-tab" onClick={() => { history.push(page.innerUri) }} key={idx}>
          <i className={`bottom-tab-icon ${page.icon}`}></i>
          <div className="bottom-tab-text">
            {page.name}
          </div>
        </div>
      ))}

    </div>
  );
})
