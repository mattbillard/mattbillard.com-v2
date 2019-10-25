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
  const page = config.pages[data.page];
  const title = `${config.siteTitle}${page.windowTitle}`;
  const uri = page.outerUri;
  if (window.location.pathname === uri) {
    return;
  }
  window.history.replaceState({}, title, uri);
  window.document.title = title;
}