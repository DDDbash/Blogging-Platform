import { Comment } from "./comment";
import { UserInBlog } from "./user";

export type BlogPayload = {
  title: string;
  content: string;
  image: string;
};

export type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: UserInBlog;
  comments: Comment[];
  image: string;
};
