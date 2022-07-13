import type { TComment } from './comment';
import type { TUser } from './user';

export type TPublication = {
  _id: string;
  description: string;
  images?: string[];
  comments?: TComment[];
  state: string;
  user: TUser;

  createdAt?: string;
};
