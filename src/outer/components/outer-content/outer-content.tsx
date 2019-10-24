import React from 'react';

import './outer-content.css';


export const OuterContent: React.FC = () => {
  return (
    <div>

    <div id="moveableBlocksWrapper">

      <div className="phone mblock">
        <div className="iframe-container">
          <iframe src="/inner/home"></iframe>
        </div>
        <div className="phone-image"></div>
      </div>

    </div>


    </div>
  );
}
