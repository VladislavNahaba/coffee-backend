import express, { Router, Request, Response } from "express";

import { UserDTO } from "../dto/user.dto";

import { dataSource } from "../db/app-data-source";
import { User } from "../db/entity/user.entity";
import { Membership } from "../db/entity/membership.entity";

export const userRouter: Router = express.Router();

// Register customer
userRouter.post("/register", async (req: UserDTO, res: Response) => {
  const membership = req.body.membership;
  if (!membership) return res.status(404).send("Not found membership");

  const memberEntity = await dataSource.getRepository(Membership).findOne({
    where: {
      type: membership,
    },
  });
  if (memberEntity) {
    try {
      const user = dataSource.getRepository(User).create({
        name: req.body.name,
        membership: memberEntity,
      });
      const results = await dataSource.getRepository(User).save(user);

      return res.send(results);
    } catch (e) {
      res.status(400).send("This user already exist");
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
