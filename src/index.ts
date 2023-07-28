import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, Express } from "express";
import cors from "cors";

import { dataSource } from "./db/app-data-source";

import { userRouter, qoutaRouter, coffeeRouter } from "./router";

// Init database
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// use routers, plugins, middlewares etc...
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/qouta", qoutaRouter);
app.use("/coffee", coffeeRouter);

const port = process.env.PORT;

// TMP: remove
app.get("/", (req: Request<{}, {}>, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Run server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
