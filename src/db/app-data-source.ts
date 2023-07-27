import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

// Database config
const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["src/db/entity/*.ts"],
  migrations: ["src/db/migrations/*.[ts|js]"],
  migrationsTableName: "migrations",
  logging: false,
  synchronize: true,
  seeds: ["src/db/seeds/**/*{.ts,.js}"],
  // factories: ["src/db/factories/**/*{.ts,.js}"], // For fake data. Usable for testing
};

export const dataSource = new DataSource(options);
