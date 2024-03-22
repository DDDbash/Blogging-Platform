import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be more than 2 characters" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(3, { message: "Password should be more than 2 characters" }),
});

export type SignupSchema = z.infer<typeof formSchema>;
