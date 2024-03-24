import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";

import { deleteComment } from "@/apis/comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment } from "@/types/comment";
import { User } from "@/types/user";

type Props = {
  profile: User | null;
  comment: Comment;
  onEditClick: () => void;
};

const CommentEditDelete = (props: Props) => {
  const { profile, comment, onEditClick } = props;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["comments-of-blog", res.data.postId],
      });
    },
  });

  return (
    <>
      {profile?.id === comment.author.id && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onEditClick();
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteMutation.mutate(comment.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default CommentEditDelete;
