import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Coffee } from "../entity/coffee.entity";

export default class CoffeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Coffee);

    await repository.insert([
      {
        type: "Americano",
      },
      {
        type: "Cappuccino",
      },
      {
        type: "Espresso",
      },
    ]);
  }
}
