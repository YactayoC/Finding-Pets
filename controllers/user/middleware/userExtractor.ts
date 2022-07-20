import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import type { jwtRequest } from "controllers/user/types";

const getTokenFrom = (request: jwtRequest) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

export const userExtractor = (
  request: jwtRequest,
  response: NextApiResponse,
  next: Function
) => {
  const token = getTokenFrom(request);

  if (!token) {
    response.status(400).json({
      error: "token missing or invalid",
    });
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");

  const { _id: id } = decodedToken as { _id: string };
  request.userId = id;
  next();
};
