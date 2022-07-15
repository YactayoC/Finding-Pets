import type { TUser } from './user';

export type TPublication = {
  _id: string;
  description: string;
  images?: string[];
  comments?: [{
    comment: string;
    user: string;
    date: string;
  }],
  state: string;
  user: TUser;

  createdAt?: string;
};
