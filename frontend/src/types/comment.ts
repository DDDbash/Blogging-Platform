import { UserInBlog } from "./user";

export type Comment = {
  id: number;
  content: string;
  author: UserInBlog;
  createdAt: string;
  updatedAt: string;
};

export type CommentPayload = {
  content: string;
};
