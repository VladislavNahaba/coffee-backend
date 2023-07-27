import express, { Router, Response } from "express";

import { dataSource } from "../db/app-data-source";
import { Membership } from "../db/entity/membership.entity";
import { User } from "../db/entity/user.entity";
import { Order } from "../db/entity/order.entity";
import { coffeeDTO } from "../dto/coffee.dto";

import { humanize } from "../helpers/duration";

export const coffeeRouter: Router = express.Router();

const ONE_HOUR = 60 * 60 * 1000;

coffeeRouter.post("/buy", async (req: coffeeDTO, res: Response) => {
  const userId = req.headers["user-id"];
  const membershipType = req.headers["membership-type"];

  const { coffee } = req.body;
  // if not user id is provided throw error
  if (!userId) {
    return res.status(400).send("No user id");
  }
  try {
    // find user
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.membership", "membership")
      .leftJoinAndSelect("membership.quotas", "quotas")
      .leftJoinAndSelect("quotas.coffee", "coffee")
      .where("user.id = :id", { id: Number(userId) })
      .getOne();

    // find membership
    const userMembership =
      user?.membership ||
      (await dataSource
        .getRepository(Membership)
        .findOne({ where: { type: membershipType } }));

    // get qouta for current user membership
    const currentQoutaForRequestedCofffee = userMembership?.quotas.find(
      (qouta) => qouta.coffee.type === coffee
    );

    const orderRepository = dataSource.getRepository(Order);

    let previousedTodayOrders: Order[] = [];

    // get previous orders for current user
    if (currentQoutaForRequestedCofffee?.type === "daily") {
      previousedTodayOrders = await orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.coffee", "coffee")
        .where("order.created_at >= :startDate", {
          startDate: new Date(new Date().setHours(8, 30, 0, 0)),
        })
        .andWhere("order.created_at < :endDate", {
          endDate: new Date(new Date().setHours(22, 30, 0, 0)),
        })
        .andWhere("order.user.id = :userId", { userId: user?.id })
        .andWhere("coffee.id = :id", {
          id: currentQoutaForRequestedCofffee.coffee.id,
        })
        .getMany();
    } else if (currentQoutaForRequestedCofffee?.type === "hourly") {
      previousedTodayOrders = await orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.coffee", "coffee")
        .where("order.created_at < :date", {
          date: new Date(new Date().getTime() - ONE_HOUR),
        })
        .andWhere("order.user.id = :userId", { userId: user?.id })
        .andWhere("coffee.type = :coffee", {
          coffee: currentQoutaForRequestedCofffee.coffee.type,
        })
        .getMany();
    }

    // if users already ordered more coffee than he can - give them warning that is too much coffee and timestamp for next one available coffee
    if (
      Number(currentQoutaForRequestedCofffee?.amount) <=
      previousedTodayOrders.length
    ) {
      let waitTime = 0;
      if (currentQoutaForRequestedCofffee?.type === "daily") {
        // get tomorrow open date
        const tomorrowOpen = new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).setHours(8, 30, 0, 0);
        waitTime = tomorrowOpen - new Date().getTime();
      } else {
        // get the difference between oldest requested coffee and next one available
        const theOldestOneRequest = previousedTodayOrders.reduce(
          (a, b) => Math.min(a, b.created_at.getTime()),
          0
        );
        const nextHourFromOldest = new Date().setTime(
          theOldestOneRequest + ONE_HOUR
        );
        waitTime = nextHourFromOldest;
      }
      return res
        .status(429)
        .send(`You take too much coffee. Need to wait ${humanize(waitTime)}`);
    }

    // make the order
    if (currentQoutaForRequestedCofffee && user) {
      const order = new Order();
      order.coffee = currentQoutaForRequestedCofffee?.coffee;
      order.user = user;
      const orderCreated = orderRepository.create(order);
      await orderRepository.save(orderCreated);
      res.status(200).end(coffee);
    }
  } catch (e) {
    res.status(404).send("User not found");
  }
});
