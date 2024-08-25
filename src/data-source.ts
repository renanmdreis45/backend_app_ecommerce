import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Purchase } from "./entity/Purchase";

dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  logging: true,
  entities: [User, Purchase],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});