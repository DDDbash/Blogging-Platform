"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { editBlog } from "@/apis/blog";
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
import { useBlogDetailsQuery } from "@/hooks/queries/blog";
import { BlogPayload } from "@/types/blog";
import { APIErrorWrapper, APIReponse } from "@/types/common";

import { formSchema } from "../../../schema";

type Props = {
  postId: string;
};

const EditBlogForm = (props: Props) => {
  const { postId } = props;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const router = useRouter();

  const { data: blogDetailsQuery } = useBlogDetailsQuery(Number(postId) ?? 0);
  const blogDetails = blogDetailsQuery?.data;

  const form = useForm<BlogPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { setValue } = form;

  const editBlogMutation = useMutation<
    APIReponse,
    APIErrorWrapper<string>,
    BlogPayload
  >({
    mutationFn: (data: BlogPayload) => editBlog(Number(postId), data),
  });

  useEffect(() => {
    if (!blogDetails) return;
    setValue("title", blogDetails.title);
    setValue("content", blogDetails.content);
  }, [setValue, blogDetails]);

  const onSubmit = (data: BlogPayload) => {
    editBlogMutation.mutate(data, {
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

          <Button disabled={editBlogMutation.isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBlogForm;
