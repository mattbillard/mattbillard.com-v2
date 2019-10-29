export const pages = {
  home: {
    name: 'Home',
    api: '/api/home.json',
    icon: 'fas fa-home',
    uri: '/',
    windowTitle: '',
  },
  about: {
    name: 'About',
    api: '/api/about.json',
    icon: 'fas fa-user',
    uri: '/about',
    windowTitle: ' - About',
  },
  skills: {
    name: 'Skills',
    api: '/api/skills.json',
    icon: 'fas fa-code',
    uri: '/skills',
    windowTitle: ' - Skills',
  },
  contact: {
    name: 'Contact',
    api: '/api/contact.json',
    icon: 'fas fa-envelope',
    uri: '/contact',
    windowTitle: ' - Contact',
  },
};

export enum Themes {
  Default = 'blueTheme',
  Blue = 'blueTheme',
  Red = 'redTheme',
  Retro = 'retroTheme',
  WhatsApp = 'whatsAppTheme',
}

export const siteTitle = 'MattBillard.com';
