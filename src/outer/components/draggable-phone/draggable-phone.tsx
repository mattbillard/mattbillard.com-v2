import React, { useEffect } from 'react';

import * as config from '../../../config';
import { updateParentUrlAndTitle } from '../../../shared/utils/utils';

import './draggable-phone.scss';

export const DraggablePhone: React.FC = () => {
  useEffect(() => {
    // When iframe child navigates, it tells parent to update URL and title
    window.addEventListener('message', updateParentUrlAndTitle);
  });

  const page = window.location.pathname || config.pages.home.outerUri;
  const hash = window.location.hash;

  return (
    <div id="moveableBlocksWrapper">
      <div className="phone-wrapper mblock">
        <div className="iframe-container">
          <iframe src={`/inner${page}${hash}`} title="portfolio"></iframe>
        </div>
        <div className="phone-image"></div>
      </div>
    </div>
  );
}

