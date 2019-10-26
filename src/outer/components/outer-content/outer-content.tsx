import React from 'react';

import { DraggablePhone, SiteNav } from '../';

import 'bootstrap/dist/css/bootstrap.min.css';

export const OuterContent: React.FC = () => {
  return (
    <div>
      <SiteNav />
      <DraggablePhone />
    </div>
  );
}

