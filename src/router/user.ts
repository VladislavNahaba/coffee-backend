import express, { Router, Request, Response } from "express";

import { UserDTO } from "../dto/user.dto";

import { dataSource } from "../db/app-data-source";
import { User } from "../db/entity/user.entity";
import { Membership } from "../db/entity/membership.entity";

export const userRouter: Router = express.Router();

// Register customer
userRouter.post("/register", async (req: UserDTO, res: Response) => {
  // here we can use cookies to get this data and token, but i've did it like it was in task description
  const { membership, name } = req.body;
  if (!membership) return res.status(400).end("Not found membership");
  if (!name) return res.status(400).end("No name detected");

  const memberEntity = await dataSource.getRepository(Membership).findOne({
    where: {
      type: membership,
    },
  });
  if (memberEntity) {
    try {
      const user = dataSource.getRepository(User).create({
        name: name,
        membership: memberEntity,
      });
      const results = await dataSource.getRepository(User).save(user);

      return res.send(results);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

// Enter as regular customer
userRouter.post(
  "/login",
  async (
    req: Request<{}, {}, Pick<UserDTO["body"], "name">>,
    res: Response
  ) => {
    const { name } = req.body;
    const user = await dataSource.getRepository(User).findOne({
      where: {
        name: name,
      },
    });

    if (!user) return res.status(404).send("This user does not exist");

    return res.send(user);
  }
);
