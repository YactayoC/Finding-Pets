import type { TUser } from './user';

export type TComment = {
  _id: string;
  comments: string[];
  user: TUser;

  createdAt: string;
};
