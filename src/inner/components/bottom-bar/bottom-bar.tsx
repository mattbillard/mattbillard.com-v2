import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import * as config from '../../../config';

const { pages } = config;

export const BottomBar = withRouter(({ history }) =>  {
  return (
    <div>
      <TabBar
        barTintColor="#111118"
        tintColor="#ccc"
        unselectedTintColor="#ccc"
      >
        <TabBar.Item
          title="Home"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(pages.home.innerUri) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="About"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(pages.about.innerUri) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="Skills"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(pages.skills.innerUri) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="Contact"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(pages.contact.innerUri) }}
        >
        </TabBar.Item>
      </TabBar>
    </div>
  );
})
