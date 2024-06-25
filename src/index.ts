import express, { Request, Response } from "express";
import cors from "cors";
import googleAuthRouter from "./googleAuth/auth.js";

const app = express();
const port = 3001;

// handling cors
app.use(cors());

// routes
app.use("/api", googleAuthRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello app is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
