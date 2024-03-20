import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column()
  createdAt: string;

  @Column({
    nullable: true,
  })
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
