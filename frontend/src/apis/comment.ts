import * as axios from "@/config/axios";
import { Comment, CommentPayload } from "@/types/comment";
import { APIReponse } from "@/types/common";
import { urls } from "@/utils/urls";

export const getCommentsOfBlog = (postId: number) => {
  return axios
    .get<APIReponse<Comment[]>>(
      urls.commentsOfBlog.replace(":postId", String(postId)),
    )
    .then((res) => res.data);
};

export const createComment = (postId: number, payload: CommentPayload) => {
  return axios
    .post<APIReponse<{ postId: number }>>(
      urls.commentsOfBlog.replace(":postId", String(postId)),
      payload,
    )
    .then((res) => res.data);
};

export const editComment = (commentId: number, payload: CommentPayload) => {
  return axios
    .patch<APIReponse<{ postId: number }>>(
      urls.commentId.replace(":commentId", String(commentId)),
      payload,
    )
    .then((res) => res.data);
};

export const deleteComment = (commentId: number) => {
  return axios
    .del<APIReponse<{ postId: number }>>(
      urls.commentId.replace(":commentId", String(commentId)),
    )
    .then((res) => res.data);
};
