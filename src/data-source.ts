import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Purchase } from "./entity/Purchase";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

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