import { Request, Response } from "express";
import dataSource from "../datasource/dataSource";
import { Post } from "../entities/Post";
import { AuthenticatedUserRequest } from "../interface/auth";

const formatData = (post: Post) => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    author: {
      id: post.author.id,
      username: post.author.username,
    },
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
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
        author: true,
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

  if (!req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.author = req.user;

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
        author: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.author.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    existingPost.title = post.title;
    existingPost.content = post.content;
    existingPost.author = req.user;

    const result = await postRepo.save(existingPost);

    const returnValue = formatData(result);

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
        author: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.author.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await postRepo.softDelete(Number(postId));

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(422).json(error);
  }
};
