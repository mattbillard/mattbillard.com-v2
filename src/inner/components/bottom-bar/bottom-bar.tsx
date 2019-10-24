import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import { config } from '../../../config';

const { uris } = config;

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
          onPress={() => { history.push(uris.home.page) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="About"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(uris.about.page) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="Skills"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(uris.skills.page) }}
        >
        </TabBar.Item>
        <TabBar.Item
          title="Contact"
          icon={<div style={{color:'#fa0'}}>&#9673;</div>}
          onPress={() => { history.push(uris.contact.page) }}
        >
        </TabBar.Item>
      </TabBar>
    </div>
  );
})
