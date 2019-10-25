import React, { useEffect } from 'react';

import * as config from '../../../config';
import { updateParentUrlAndTitle } from '../../../shared/utils/utils';

import './draggable-phone.css';

export const DraggablePhone: React.FC = () => {
  useEffect(() => {
    // When iframe child navigates, it tells parent to update URL and title
    window.addEventListener('message', updateParentUrlAndTitle);
  });

  const page = window.location.pathname || config.pages.home.outerUri;

  return (
    <div id="moveableBlocksWrapper">
      <div className="phone-wrapper mblock">
        <div className="iframe-container">
          <iframe src={`/inner${page}`} title="portfolio"></iframe>
        </div>
        <div className="phone-image"></div>
      </div>
    </div>
  );
}

