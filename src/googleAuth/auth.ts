import express, { Request, Response } from "express";
import {
  getAccessToken,
  getAuthURL,
  getMailFromGmail,
} from "./get-auth-url.js";

const router = express.Router();

router.get("/auth/google", (req: Request, res: Response) => {
  const url = getAuthURL();
  console.log(url);

  res.status(200).send({ url });
});

router.get("/auth/google/callback", (req: Request, res: Response) => {
  const code = req.query.code as string;
  getAccessToken(code);
  res.status(200).send(`Access Token added`);
});

router.get("/google/get-mails", async (req: Request, res: Response) => {
  const mails = await getMailFromGmail();
  res.status(200).send({
    mails,
  });
});

export default router;
