import React from 'react';

import { Menu } from 'antd';

export const TopBar: React.FC = () => {
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>MattBillard.com</Menu.Item>
    </Menu>
  );
}
