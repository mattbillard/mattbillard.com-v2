import React from 'react';

import { TabBar } from 'antd-mobile';

export const BottomBar: React.FC = () => {
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
    >
      <TabBar.Item
        title="Life"
        key="Life"
        icon={<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }} />}
        badge={1}
      >
      </TabBar.Item>
      <TabBar.Item
        icon={<div style={{ width: '22px', height: '22px', background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }} />}
        title="Koubei"
        key="Koubei"
        badge={'new'}
      >
      </TabBar.Item>
      <TabBar.Item
        icon={<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }} />}
        title="Friend"
        key="Friend"
        dot
      >
      </TabBar.Item>
      <TabBar.Item
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        title="My"
        key="my"
      >
      </TabBar.Item>
    </TabBar>
  );
}
