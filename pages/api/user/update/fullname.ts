import { createRouter } from "next-connect";

import { userExtractor } from "controllers/user/middleware/userExtractor";
import { fullName as updateFullName } from "controllers/user/services/update";

import type { NextApiResponse } from "next";
import type { jwtRequest } from "controllers/user/types";

const router = createRouter<jwtRequest, NextApiResponse>();

//middleware for extract user from token
router.use(userExtractor);

router.put(async (req, res) => {
  try {
    const { userId: id } = req;
    const { fullName } = req.body;
    const user = await updateFullName(id, fullName);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
