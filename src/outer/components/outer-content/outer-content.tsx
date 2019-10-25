import React, { useEffect } from 'react';

import * as config from '../../../config';
import { updateParentUrlAndTitle } from '../../../shared/utils/utils';

import './outer-content.css';

export const OuterContent: React.FC = () => {
  useEffect(() => {
    // When iframe child navigates, it tells parent to update URL and title
    window.addEventListener('message', updateParentUrlAndTitle);
  });

  const page = window.location.pathname || config.pages.home.outerUri;

  return (
    <div>

      <div id="moveableBlocksWrapper">
        <div className="phone mblock">
          <div className="iframe-container">
            <iframe src={`/inner${page}`} title="portfolio"></iframe>
          </div>
          <div className="phone-image"></div>
        </div>
      </div>

    </div>
  );
}

