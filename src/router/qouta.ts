import express, { Router, Request, Response } from "express";

import { dataSource } from "../db/app-data-source";
import { Membership } from "../db/entity/membership.entity";

export const qoutaRouter: Router = express.Router();

// get qouta config
qoutaRouter.get("/", async (req: Request, res: Response) => {
  const plans = await dataSource
    .createQueryBuilder()
    .select("membership")
    .from(Membership, "membership")
    .leftJoinAndSelect("membership.quotas", "quotas")
    .leftJoinAndSelect("quotas.coffee", "coffee")
    .getMany();

  return res.status(200).send(plans);
});
