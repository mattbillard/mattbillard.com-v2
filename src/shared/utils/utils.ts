import * as config from '../../config';

export const tellParentToUpdateUrl = (page) => {
  const type = config.events.ChildPageLoaded;
  const origin = window.location.origin;

  window.parent.postMessage({type, page}, origin);
}

export const updateParentUrlAndTitle = (message) => {
  const { data } = message;
  if (data.type !== config.events.ChildPageLoaded) {
    return;
  }
  
  // Update URL and title if necessary
  const { outerUri, windowTitle } = config.pages[data.page];
  if (window.location.pathname === outerUri) {
    return;
  }
  
  const title = config.siteTitle + windowTitle;
  window.document.title = title;

  const hash = window.location.hash;
  const uri = outerUri + hash;
  window.history.replaceState({}, title, uri);
  
}