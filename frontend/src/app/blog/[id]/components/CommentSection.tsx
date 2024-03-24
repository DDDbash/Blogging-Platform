"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createComment } from "@/apis/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCommentsOfBlogQuery } from "@/hooks/queries/comment";
import { Blog } from "@/types/blog";
import { CommentPayload } from "@/types/comment";
import { APIErrorWrapper, APIReponse } from "@/types/common";
import { User } from "@/types/user";

import CommentListItem from "./CommentListItem";

type Props = {
  blogDetails: Blog | null;
  profile: User | null;
};

const CommentSection = (props: Props) => {
  const { blogDetails, profile } = props;

  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data: commentsListQuery } = useCommentsOfBlogQuery(
    blogDetails?.id || 0,
  );
  const commentsList = commentsListQuery?.data;

  const createCommentMutation = useMutation<
    APIReponse<{ postId: number }>,
    APIErrorWrapper<string>,
    { data: CommentPayload; id: number }
  >({
    mutationFn: ({ data, id }) => createComment(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["comments-of-blog", res.data.postId],
      });
      setNewComment("");
    },
  });

  return (
    <div className="mt-10 flex w-full flex-col gap-2">
      <h3>Comments:</h3>

      {profile && (
        <div className="mb-4 flex flex-col gap-2 rounded-lg px-6 py-4 shadow-lg">
          <h6>{profile?.username}</h6>

          <Textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />

          <Button
            className="w-fit"
            onClick={() => {
              if (!newComment) {
                toast({
                  title: "Please enter a comment",
                });
                return;
              }
              createCommentMutation.mutate({
                data: { content: newComment },
                id: blogDetails?.id || 0,
              });
            }}
          >
            Comment
          </Button>
        </div>
      )}

      {commentsList && commentsList.length > 0 && (
        <div className="flex flex-col gap-2 rounded-lg px-6 py-4 shadow-lg">
          {commentsList.map((comment) => {
            return (
              <CommentListItem
                key={comment.id}
                profile={profile}
                comment={comment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
