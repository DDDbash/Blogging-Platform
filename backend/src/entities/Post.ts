import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: string;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: string | null;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
