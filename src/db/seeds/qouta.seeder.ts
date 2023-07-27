import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Quota } from "../entity/quota.entity";
import { Membership } from "../entity/membership.entity";
import { Coffee } from "../entity/coffee.entity";

export default class QuotaSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Quota);
    const membershipRepository = dataSource.getRepository(Membership);
    const coffeeRepository = dataSource.getRepository(Coffee);

    const basicMembership = await membershipRepository.findOne({
      where: {
        name: "Basic",
      },
    });
    const loverMembership = await membershipRepository.findOne({
      where: {
        name: "Coffee Lover",
      },
    });
    const maniacMembership = await membershipRepository.findOne({
      where: {
        name: "Americano Maniac",
      },
    });

    if (basicMembership && loverMembership && maniacMembership) {
      await repository.insert([
        // Basic membership
        {
          amount: 1,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Cappuccino" },
          }))!,
          membership: basicMembership,
        },
        {
          amount: 2,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Espresso" },
          }))!,
          membership: basicMembership,
        },
        {
          amount: 3,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Americano" },
          }))!,
          membership: basicMembership,
        },
        // Lover Membership
        {
          amount: 5,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Americano" },
          }))!,
          membership: loverMembership,
        },
        {
          amount: 5,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Cappuccino" },
          }))!,
          membership: loverMembership,
        },
        {
          amount: 5,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Espresso" },
          }))!,
          membership: loverMembership,
        },
        // Maniac membership
        {
          amount: 5,
          type: "hourly",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Americano" },
          }))!,
          membership: maniacMembership,
        },
        {
          amount: 1,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Cappuccino" },
          }))!,
          membership: maniacMembership,
        },
        {
          amount: 2,
          type: "daily",
          coffee: (await coffeeRepository.findOne({
            where: { type: "Espresso" },
          }))!,
          membership: maniacMembership,
        },
      ]);
    }
  }
}
