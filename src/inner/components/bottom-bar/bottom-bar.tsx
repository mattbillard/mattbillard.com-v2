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
        {Object.values(pages).map((page, idx) => (
          <TabBar.Item
            title={page.name}
            icon={<i className={`${page.icon}`}></i>}
            onPress={() => { history.push(page.innerUri) }}
            key={idx}
          />
        ))}
      </TabBar>
    </div>
  );
})
