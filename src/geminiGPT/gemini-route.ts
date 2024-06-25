import express, { Request, Response } from "express";
import { getPromptResult } from "./prompt.js";

const router = express.Router();

router.get("/get-result", async (req: Request, res: Response) => {
  const result = await getPromptResult();

  res.status(200).send(result);
});

export default router;
