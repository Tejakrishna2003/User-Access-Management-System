import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Software } from "./entities/Software";
import { Request } from "./entities/Request";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Software, Request],
  migrations: [],
  subscribers: [],
});