import type { TUser } from './user';

export type TPublication = {
  _id: string;
  description: string;
  images?: string[];
  comments?: [{
    comment: string;
    user: string;
  }],
  state: string;
  user: TUser;

  createdAt?: string;
};
