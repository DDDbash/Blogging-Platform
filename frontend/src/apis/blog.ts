import * as axios from "@/config/axios";
import { Blog } from "@/types/blog";
import {
  APIPaginationResponse,
  APIReponse,
  PaginationParams,
} from "@/types/common";
import { urls } from "@/utils/urls";

export const getBlogsList = (query: PaginationParams) => {
  return axios
    .get<APIPaginationResponse<Blog>>(urls.blogPost, { params: query })
    .then((res) => res.data);
};

export const getBlogDetails = (postId: number) => {
  return axios
    .get<APIReponse<Blog>>(
      urls.blogPostDetail.replace(":postId", String(postId)),
    )
    .then((res) => res.data);
};

export const getAuthBlogDetails = (postId: number) => {
  return axios
    .get<APIReponse<Blog>>(
      urls.authBlogPostDetail.replace(":postId", String(postId)),
    )
    .then((res) => res.data);
};

export const createBlog = (payload: FormData) => {
  return axios.post<APIReponse>(urls.blogPost, payload).then((res) => res.data);
};

export const editBlog = (postId: number, payload: FormData) => {
  return axios
    .patch<APIReponse>(
      urls.blogPostDetail.replace(":postId", String(postId)),
      payload,
    )
    .then((res) => res.data);
};

export const deleteBlog = (postId: number) => {
  return axios
    .del<APIReponse>(urls.blogPostDetail.replace(":postId", String(postId)))
    .then((res) => res.data);
};
