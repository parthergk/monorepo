import express, { type Request, type Response } from "express";
import { prismaClient } from "@repo/db/client";
const app = express();

app.use(express.json());

app.get("/users", async (req:Request, res:Response) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/user", async (req:Request, res:Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("http server is runing on port 8080");
});
