import React from 'react';
import * as config from '../../../config';

import { NavBar } from 'antd-mobile';

export const TopBar: React.FC = () => {
  return (
    <NavBar
      mode="dark"
      style={{background:'#111118'}}
    >
      <div style={{color:'#ddd'}}>
        {config.siteTitle}
      </div>
    </NavBar>
  );
}
