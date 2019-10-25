export enum events {
  ChildPageLoaded = 'CHILD_PAGE_LOADED'
}

export const pages = {
  home: {
    name: 'Home',
    api: '/api/home.json',
    icon: 'fas fa-home',
    innerUri: '/inner/home',
    outerUri: '/',
    windowTitle: '',
  },
  about: {
    name: 'About',
    api: '/api/about.json',
    icon: 'fas fa-user',
    innerUri: '/inner/about',
    outerUri: '/about',
    windowTitle: ' - About',
  },
  skills: {
    name: 'Skills',
    api: '/api/skills.json',
    icon: 'fas fa-code',
    innerUri: '/inner/skills',
    outerUri: '/skills',
    windowTitle: ' - Skills',
  },
  contact: {
    name: 'Contact',
    api: '/api/contact.json',
    icon: 'fas fa-envelope',
    innerUri: '/inner/contact',
    outerUri: '/contact',
    windowTitle: ' - Contact',
  },
};

export const siteTitle = 'MattBillard.com';
