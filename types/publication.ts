import type { TUser } from './user';

export type TPublication = {
  _id: string;
  description: string;
  images?: string[];
  comments?: [{
    _id: string | string[] | undefined;
    comment: string;
    user: string;
    date: string;
  }],
  state: string;
  user: TUser;

  createdAt?: string;
};
