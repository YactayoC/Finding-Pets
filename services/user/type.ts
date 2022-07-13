import { TUser } from 'types';

export type PersistUserResponse = {
  token: string;
  user: TUser;
};
