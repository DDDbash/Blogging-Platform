"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signin } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Auth } from "@/types/auth";
import { APIErrorWrapper, APIReponse } from "@/types/common";

import { formSchema, SignInSchema } from "../schema";

const SignInForm = () => {
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation<
    APIReponse<Auth>,
    APIErrorWrapper<string>,
    SignInSchema
  >({
    mutationFn: (data: SignInSchema) => signin(data),
  });

  const onSubmit = (data: SignInSchema) => {
    signupMutation.mutate(data, {
      onSuccess: (res) => {
        Cookies.set("access_token", res.data.token);
        router.push("/");
      },
      onError: (err) => {
        setGeneralErrorMessage(err.response?.data.message || "Error");
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Link href="/signup" className="text-sm text-black hover:underline">
              Create an account
            </Link>
          </div>

          <Button disabled={signupMutation.isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>

      {generalErrorMessage && (
        <span className="text-sm text-red-500">{generalErrorMessage}</span>
      )}
    </div>
  );
};

export default SignInForm;
