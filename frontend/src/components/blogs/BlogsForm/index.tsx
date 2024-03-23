"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { createBlog, editBlog } from "@/apis/blog";
import { formSchema } from "@/app/blog/schema";
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
import { useAuthBlogDetailsQuery } from "@/hooks/queries/blog";
import { BlogPayload } from "@/types/blog";
import { APIErrorWrapper, APIReponse } from "@/types/common";

type Props = {
  postId?: string;
};

const BlogsForm = (props: Props) => {
  const { postId } = props;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const router = useRouter();

  const { data: blogDetailsQuery } = useAuthBlogDetailsQuery(
    Number(postId) ?? 0,
  );
  const blogDetails = blogDetailsQuery?.data;

  const form = useForm<BlogPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { setValue } = form;

  const blogMutation = useMutation<
    APIReponse,
    APIErrorWrapper<string>,
    BlogPayload
  >({
    mutationFn: postId
      ? (data: BlogPayload) => editBlog(Number(postId), data)
      : createBlog,
  });

  useEffect(() => {
    if (!blogDetails) return;

    setValue("title", blogDetails.title);
    setValue("content", blogDetails.content);
  }, [setValue, blogDetails]);

  const onSubmit = (data: BlogPayload) => {
    blogMutation.mutate(data, {
      onSuccess: (res) => {
        const defaultMsg = postId ? "Blog Updated" : "Blog Created";
        toast({
          title: res?.message || defaultMsg,
        });
        queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
        if (postId) {
          queryClient.invalidateQueries({
            queryKey: ["blog-details", Number(postId)],
          });
        }
        router.push("/");
      },
      onError: (err) => {
        const defaultMsg = postId
          ? "Blog Update Failed"
          : "Blog Creation Failed";

        toast({
          title: err.response?.data.message || defaultMsg,
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

          <Button disabled={blogMutation.isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogsForm;
