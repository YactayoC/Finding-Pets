import type { NextApiRequest } from "next";

export type jwtRequest = NextApiRequest & {
  userId: string;
};
