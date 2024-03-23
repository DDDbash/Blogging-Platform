export type User = {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type UserInBlog = Pick<User, "id" | "username">;
