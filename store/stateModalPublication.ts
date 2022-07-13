import { atom } from 'jotai';

type modalEditPublication = {
  isVisible: boolean;
  id?: string | null;
  description? : string;
  state?: string;
  images?: any;
};

export const stateModalPublication = atom<modalEditPublication>({
  isVisible: false,
  id: null,
});
