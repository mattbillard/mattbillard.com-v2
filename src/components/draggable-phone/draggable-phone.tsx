import React from 'react';

import { InnerContent } from '../';

import './draggable-phone.scss';

export const DraggablePhone: React.FC = () => {
  return (
    <div id="moveableBlocksWrapper">
      <div className="phone-wrapper mblock">
        <div className="iframe-container">
          <InnerContent />
        </div>
        <div className="phone-image"></div>
      </div>
    </div>
  );
}

