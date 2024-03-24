import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { editComment } from "@/apis/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment, CommentPayload } from "@/types/comment";
import { APIErrorWrapper, APIReponse } from "@/types/common";
import { User } from "@/types/user";

import CommentEditDelete from "./CommentEditDelete";

type Props = {
  profile: User | null;
  comment: Comment;
};

const CommentListItem = (props: Props) => {
  const { profile, comment } = props;

  const queryClient = useQueryClient();

  const [isCommentEditMode, setIsCommentEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const editMutation = useMutation<
    APIReponse<{ postId: number }>,
    APIErrorWrapper<string>,
    { data: CommentPayload; id: number }
  >({
    mutationFn: ({ id, data }) => editComment(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["comments-of-blog", res.data.postId],
      });
    },
  });

  return (
    <div className="flex flex-col rounded-lg border border-gray-500 p-2">
      <div className="flex justify-between">
        <h6>{comment.author.username}</h6>

        <CommentEditDelete
          profile={profile}
          comment={comment}
          onEditClick={() => {
            setIsCommentEditMode(true);
          }}
        />
      </div>

      {isCommentEditMode ? (
        <>
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <div className="flex gap-2 pt-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsCommentEditMode(false);
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={editMutation.isPending}
              onClick={() => {
                editMutation.mutate({
                  data: { content: editedComment },
                  id: comment.id,
                });
                setIsCommentEditMode(false);
              }}
            >
              Update
            </Button>
          </div>
        </>
      ) : (
        <p className="text-regular">{editedComment}</p>
      )}
    </div>
  );
};

export default CommentListItem;
