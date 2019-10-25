import React from 'react';
import { Menu } from 'antd';

import * as config from '../../../config';
import './top-bar.css';

const { Item, ItemGroup, SubMenu } = Menu;

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <Menu mode="horizontal" theme="dark">
        <Item key="mail">
          <a href={config.pages.home.outerUri}>{config.siteTitle}</a>
        </Item>
        <SubMenu title={<span>Blogs</span>}>
          <ItemGroup title="Item 1">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
          </ItemGroup>
          <ItemGroup title="Item 2">
            <Item key="setting:3">Option 3</Item>
            <Item key="setting:4">Option 4</Item>
          </ItemGroup>
        </SubMenu>
        <Item key="alipay">
          <a href="/contact">Contact Us</a>
        </Item>
      </Menu>
    </div>
  );
}
