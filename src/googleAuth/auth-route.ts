import express, { Request, Response } from "express";
import {
  getAccessToken,
  getAuthURL,
  getMailFromGmail,
} from "./get-auth-url.js";
import emailParser from "../Model/email-parser.js";

const router = express.Router();

router.get("/google", (req: Request, res: Response) => {
  const url = getAuthURL();

  res.status(200).send({ url });
});

router.get("/google/callback", (req: Request, res: Response) => {
  const code = req.query.code as string;
  getAccessToken(code);
  res.status(200).send(`Access Token added`);
});

router.get("/google/get-mails", async (req: Request, res: Response) => {
  const mails = await getMailFromGmail();
  // mails.map((mail) => emailParser.addMail(mail));

  res.status(200).send({
    mails,
  });
});

export default router;
