import React from 'react';

import { DraggablePhone, TopBar } from '../';

export const OuterContent: React.FC = () => {
  return (
    <div>
      <TopBar />
      <DraggablePhone />
    </div>
  );
}

