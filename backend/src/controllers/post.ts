import { Request, Response } from "express";
import dataSource from "../datasource/dataSource";
import { Post } from "../entities/Post";
import { AuthenticatedUserRequest } from "../interface/auth";

const formatData = (post: Post) => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    user: {
      id: post.user.id,
      username: post.user.username,
    },
  };
};

export const getPosts = async (_: Request, res: Response) => {
  try {
    const postRepo = dataSource.getRepository(Post);

    const allPosts = await postRepo.find();

    res.status(200).json({ data: allPosts });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostDetails = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(404).json({ message: "Post Id is mandatory" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const postDetail = await postRepo.findOne({
      where: {
        id: Number(postId),
      },
      relations: {
        user: true,
      },
    });

    if (!postDetail) {
      return res.status(404).json({ message: "Post not found" });
    }

    const returnValue = formatData(postDetail);

    res.status(200).json({ data: returnValue });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPost = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const post = req.body;

  const date = new Date();

  if (!req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.author = post.author;
    newPost.createdAt = date.toISOString();
    newPost.user = req.user;

    const result = await postRepo.save(newPost);

    const returnValue = formatData(result);

    res.status(200).json({ data: returnValue });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const updatePost = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { postId } = req.params;
  const post = req.body;

  const date = new Date();

  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const existingPost = await postRepo.findOne({
      where: {
        id: Number(postId),
      },
      relations: {
        user: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.user.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    existingPost.title = post.title || existingPost.title;
    existingPost.content = post.content || existingPost.content;
    existingPost.author = post.author || existingPost.author;
    existingPost.updatedAt = date.toISOString();

    const result = await postRepo.update(Number(postId), {
      title: post.title || existingPost.title,
      content: post.content || existingPost.content,
      author: post.author || existingPost.author,
      updatedAt: date.toISOString(),
    });

    const returnValue = formatData({ ...existingPost, ...post });

    res.status(200).json({ data: returnValue });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const deletePost = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { postId } = req.params;

  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const existingPost = await postRepo.findOne({
      where: {
        id: Number(postId),
      },
      relations: {
        user: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.user.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await postRepo.delete(Number(postId));

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(422).json(error);
  }
};
