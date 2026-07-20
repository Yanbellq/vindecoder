import { ROUTES } from '@/constants';

interface INavMenuItem {
  path: string;
  label: string;
}

export const Nav_Config: INavMenuItem[] = [
  { path: ROUTES.PLATE, label: 'Plate' },
  { path: ROUTES.DECODE, label: 'Decoder' },
  { path: ROUTES.VARIABLES, label: 'Variables' },
];
