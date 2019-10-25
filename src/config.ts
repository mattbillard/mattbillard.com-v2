export enum events {
  ChildPageLoaded = 'CHILD_PAGE_LOADED'
}

export const pages = {
  about: {
    api: '/api/about.json',
    innerUri: '/inner/about',
    outerUri: '/about',
    windowTitle: ' - About',
  },
  contact: {
    api: '/api/contact.json',
    innerUri: '/inner/contact',
    outerUri: '/contact',
    windowTitle: ' - Contact',
  },
  home: {
    api: '/api/home.json',
    innerUri: '/inner/home',
    outerUri: '/',
    windowTitle: '',
  },
  skills: {
    api: '/api/skills.json',
    innerUri: '/inner/skills',
    outerUri: '/skills',
    windowTitle: ' - Skills',
  },
};

export const siteTitle = 'MattBillard.com';
