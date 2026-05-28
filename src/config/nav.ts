import { withBase } from '../utils/base';

export const homeHref = import.meta.env.BASE_URL;

export const navItems = [
  { href: withBase('/about-us/'), label: 'About Us' },
  { href: withBase('/resources/'), label: 'Resources' },
  { href: withBase('/publications/'), label: 'Publications' },
  { href: withBase('/results/'), label: 'Survey Results' },
] as const;
