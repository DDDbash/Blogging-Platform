import { DataSource } from "typeorm";
import { User } from "../entities/User";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "blogging-platform",
  entities: [User],
  // synchronize: true,
  // logging: true,
});

export default dataSource;
