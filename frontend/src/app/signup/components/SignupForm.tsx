"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signup } from "@/apis/auth";
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
import { ACCESS_TOKEN } from "@/utils/constants";

import { formSchema, SignupSchema } from "../schema";

const SignupForm = () => {
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const form = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation<
    APIReponse<Auth>,
    APIErrorWrapper<string>,
    SignupSchema
  >({
    mutationFn: (data: SignupSchema) => signup(data),
  });

  const onSubmit = (data: SignupSchema) => {
    signupMutation.mutate(data, {
      onSuccess: (res) => {
        Cookies.set(ACCESS_TOKEN, res.data.token);
        window.location.href = "/";
      },
      onError: (err) => {
        setGeneralErrorMessage(err.response?.data.message || "Error");
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Link href="/signin" className="text-sm text-black hover:underline">
              Already have an account? Sign-in!
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

export default SignupForm;
