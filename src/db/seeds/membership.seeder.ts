import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Membership } from "../entity/membership.entity";

export default class MembershipSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Membership);

    await repository.insert([
      {
        name: "Basic",
        type: "basic",
      },
      {
        name: "Coffee Lover",
        type: "coffee-lover",
      },
      {
        name: "Americano Maniac",
        type: "americano-maniac",
      },
    ]);
  }
}
