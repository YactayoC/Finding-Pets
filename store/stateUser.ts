import { atom } from 'jotai';
import { TUser } from 'types';

export const infoUser = atom<TUser | null>(null);
