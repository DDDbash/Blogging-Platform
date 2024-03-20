import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: string;

  @Column({
    nullable: true,
  })
  updatedAt: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
