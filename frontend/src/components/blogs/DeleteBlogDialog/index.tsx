import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBlog } from "@/apis/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  selectedBlogId?: number;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteBlogDialog = (props: Props) => {
  const { isOpen, onClose, selectedBlogId } = props;

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (blogId: number) => deleteBlog(blogId),
    onSuccess: (res) => {
      toast({
        title: res?.message || "Blog deleted",
      });
      if (selectedBlogId) {
        queryClient.invalidateQueries({
          queryKey: ["blog-details", Number(selectedBlogId)],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["blogs-list"] });
    },
    onError: () => {
      toast({
        title: "Blog Delete Failed",
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            post and remove your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMutation.mutate(selectedBlogId || 0);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster />
    </AlertDialog>
  );
};

export default DeleteBlogDialog;
