import type { RouteKey, RouteValue } from '@/types/route';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SKILLS: '/skills',
  CONTACT: '/contact',
} as const satisfies Record<RouteKey, RouteValue>;
