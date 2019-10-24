import React from 'react';

import { NavBar } from 'antd-mobile';

export const TopBar: React.FC = () => {
  return (
    <NavBar
      mode="dark"
      style={{background:'#111118'}}
    >
      <div style={{color:'#ddd'}}>
        MattBillard.com
      </div>
    </NavBar>
  );
}
