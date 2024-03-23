import { Request, Response } from "express";
import dataSource from "../datasource/dataSource";
import { Post } from "../entities/Post";
import { AuthenticatedUserRequest } from "../interface/auth";

export const getPosts = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const pageNo = page ? Number(page) : 1;
  const perPage = limit ? Number(limit) : 5;

  try {
    const postRepo = dataSource.getRepository(Post);

    const allPosts = await postRepo.findAndCount({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          id: true,
          username: true,
        },
        comments: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      skip: (pageNo - 1) * 5,
      take: perPage,
      order: {
        createdAt: "DESC",
      },
      relations: {
        author: true,
        comments: true,
      },
    });

    res.status(200).json({
      data: allPosts[0],
      meta: {
        page: pageNo,
        perPage,
        total: allPosts[1],
      },
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostDetails = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(404).json({ message: "Post Id is mandatory" });
  }

  try {
    const postRepo = dataSource.getRepository(Post);

    const postDetail = await postRepo.findOne({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          id: true,
          username: true,
        },
        comments: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: Number(postId),
      },
      relations: {
        author: true,
        comments: true,
      },
    });

    if (!postDetail) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.user && postDetail.author.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ data: postDetail });
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

    await postRepo.save(newPost);

    res.status(200).json({ message: "Post created" });
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

    await postRepo.save(existingPost);

    res.status(200).json({ message: "Post updated" });
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
