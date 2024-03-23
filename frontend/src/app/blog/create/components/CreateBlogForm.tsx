"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createBlog } from "@/apis/blog";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BlogPayload } from "@/types/blog";
import { APIErrorWrapper, APIReponse } from "@/types/common";

import { formSchema } from "../../schema";

const CreateBlogForm = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<BlogPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createBlogMutation = useMutation<
    APIReponse,
    APIErrorWrapper<string>,
    BlogPayload
  >({
    mutationFn: (data: BlogPayload) => createBlog(data),
  });

  const onSubmit = (data: BlogPayload) => {
    createBlogMutation.mutate(data, {
      onSuccess: (res) => {
        toast({
          title: res?.message || "Blog Created",
        });
        queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
        router.push("/");
      },
      onError: (err) => {
        toast({
          title: err.response?.data.message || "Blog Creation Failed",
        });
      },
    });
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter content" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={createBlogMutation.isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
