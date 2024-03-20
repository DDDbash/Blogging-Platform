import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "blogging-platform",
  entities: [User, Post],
  synchronize: true,
  // logging: true,
});

export default dataSource;
